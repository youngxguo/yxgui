import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const remoteName = process.argv[2] ?? 'origin';

function isValidationError(error: unknown): error is Error & { subject?: string; name: string } {
  return error instanceof Error && error.name === 'PrePushValidationError';
}

function runGit(args: string[]): string {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  if (result.error) {
    throw new Error(`failed to run git ${args.join(' ')}: ${result.error.message}`);
  }
  if (result.status !== 0) {
    const stderr = (result.stderr || '').trim();
    const message = stderr || `git ${args.join(' ')} failed`;
    throw new Error(message);
  }
  return (result.stdout || '').trim();
}

function runQualityChecks(): void {
  const repoRoot = runGit(['rev-parse', '--show-toplevel']);
  const result = spawnSync('pnpm', ['check:prepush'], {
    cwd: repoRoot,
    stdio: 'inherit'
  });

  if (result.error) {
    throw new Error(`failed to run pnpm check:prepush: ${result.error.message}`);
  }

  if (result.status !== 0) {
    const status = result.status ?? 'unknown';
    throw new Error(`pnpm check:prepush failed with exit code ${status}`);
  }
}

async function main(): Promise<void> {
  const stdin = readFileSync(0, 'utf8');
  const { runPrePush } = await import(new URL('./pre-push-core.ts', import.meta.url).href);
  runPrePush(stdin, { remoteName, runGit, runQualityChecks });
}

void main().catch((error: unknown) => {
  if (isValidationError(error)) {
    console.error(error.message);
    if (error.subject) {
      console.error(`Subject: ${error.subject}`);
    }
    process.exit(1);
  }

  const message = error instanceof Error ? error.message : String(error);
  console.error(`pre-push hook failed: ${message}`);
  process.exit(1);
});
