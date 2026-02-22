import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const remoteName = process.argv[2] ?? 'origin';
const allZeros = '0000000000000000000000000000000000000000';
const checkedCommits = new Set<string>();

function runGit(args: string[]): string {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  if (result.status !== 0) {
    const stderr = (result.stderr || '').trim();
    const message = stderr || `git ${args.join(' ')} failed`;
    throw new Error(message);
  }
  return (result.stdout || '').trim();
}

function fail(message: string, subject?: string): never {
  console.error(message);
  if (subject) {
    console.error(`Subject: ${subject}`);
  }
  process.exit(1);
}

function commitsForUpdate(localSha: string, remoteSha: string): string[] {
  const range =
    remoteSha === allZeros
      ? [localSha, '--not', `--remotes=${remoteName}`]
      : [`${remoteSha}..${localSha}`];

  const output = runGit(['rev-list', ...range]);
  return output ? output.split('\n').filter(Boolean) : [];
}

function validateCommitBody(commit: string): void {
  const subject = runGit(['show', '-s', '--format=%s', commit]);
  const body = runGit(['show', '-s', '--format=%b', commit]);
  const nonEmptyLines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (nonEmptyLines.length === 0) {
    fail(
      `Push rejected: commit ${commit} is missing a body.\n` +
        'Add a concise description (1-3 short lines) with what changed and why.',
      subject
    );
  }

  if (nonEmptyLines.length > 3) {
    fail(
      `Push rejected: commit ${commit} body is too long.\n` +
        'Keep commit descriptions concise (1-3 short lines).',
      subject
    );
  }
}

function main(): void {
  const stdin = readFileSync(0, 'utf8').trim();
  if (!stdin) {
    return;
  }

  for (const line of stdin.split(/\r?\n/)) {
    const [localRef, localSha, _remoteRef, remoteSha] = line.split(' ');
    if (!localRef || !localSha || !remoteSha || localSha === allZeros) {
      continue;
    }

    for (const commit of commitsForUpdate(localSha, remoteSha)) {
      if (checkedCommits.has(commit)) {
        continue;
      }
      checkedCommits.add(commit);
      validateCommitBody(commit);
    }
  }
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`pre-push hook failed: ${message}`);
  process.exit(1);
}
