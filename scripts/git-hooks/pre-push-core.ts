export const ALL_ZEROS = '0000000000000000000000000000000000000000';

export interface PushUpdate {
  localRef: string;
  localSha: string;
  remoteRef: string;
  remoteSha: string;
}

export interface PrePushDeps {
  remoteName: string;
  runGit: (args: string[]) => string;
  runQualityChecks: () => void;
}

export interface PrePushResult {
  checkedCommitCount: number;
  hasPushUpdates: boolean;
  ranQualityChecks: boolean;
}

export class PrePushValidationError extends Error {
  subject?: string;

  constructor(message: string, options?: { subject?: string }) {
    super(message);
    this.name = 'PrePushValidationError';
    this.subject = options?.subject;
  }
}

export function parsePushUpdates(stdin: string): PushUpdate[] {
  const trimmed = stdin.trim();
  if (!trimmed) {
    return [];
  }

  return trimmed
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const [localRef, localSha, remoteRef, remoteSha] = line.split(/\s+/);
      if (!localRef || !localSha || !remoteRef || !remoteSha) {
        return [];
      }

      return [{ localRef, localSha, remoteRef, remoteSha }];
    });
}

export function commitsForUpdate(
  update: Pick<PushUpdate, 'localSha' | 'remoteSha'>,
  deps: Pick<PrePushDeps, 'remoteName' | 'runGit'>
): string[] {
  const range =
    update.remoteSha === ALL_ZEROS
      ? [update.localSha, '--not', `--remotes=${deps.remoteName}`]
      : [`${update.remoteSha}..${update.localSha}`];

  const output = deps.runGit(['rev-list', ...range]);
  return output ? output.split('\n').filter(Boolean) : [];
}

export function validateCommitBody(commit: string, deps: Pick<PrePushDeps, 'runGit'>): void {
  const subject = deps.runGit(['show', '-s', '--format=%s', commit]);
  const body = deps.runGit(['show', '-s', '--format=%b', commit]);
  const nonEmptyLines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (nonEmptyLines.length === 0) {
    throw new PrePushValidationError(
      `Push rejected: commit ${commit} is missing a body.\n` +
        'Add a concise description (1-3 short lines) with what changed and why.',
      { subject }
    );
  }

  if (nonEmptyLines.length > 3) {
    throw new PrePushValidationError(
      `Push rejected: commit ${commit} body is too long.\n` +
        'Keep commit descriptions concise (1-3 short lines).',
      { subject }
    );
  }
}

export function runPrePush(stdin: string, deps: PrePushDeps): PrePushResult {
  const updates = parsePushUpdates(stdin);
  if (updates.length === 0) {
    return {
      checkedCommitCount: 0,
      hasPushUpdates: false,
      ranQualityChecks: false
    };
  }

  const checkedCommits = new Set<string>();
  let hasPushUpdates = false;

  for (const update of updates) {
    if (update.localSha === ALL_ZEROS) {
      continue;
    }

    hasPushUpdates = true;

    for (const commit of commitsForUpdate(update, deps)) {
      if (checkedCommits.has(commit)) {
        continue;
      }

      checkedCommits.add(commit);
      validateCommitBody(commit, deps);
    }
  }

  if (!hasPushUpdates) {
    return {
      checkedCommitCount: checkedCommits.size,
      hasPushUpdates,
      ranQualityChecks: false
    };
  }

  deps.runQualityChecks();

  return {
    checkedCommitCount: checkedCommits.size,
    hasPushUpdates,
    ranQualityChecks: true
  };
}
