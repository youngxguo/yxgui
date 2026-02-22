// @vitest-environment node

import { describe, expect, it, vi } from 'vitest';
import { ALL_ZEROS, PrePushValidationError, runPrePush } from './pre-push-core';

function keyFor(args: string[]): string {
  return args.join('\u0000');
}

function createGitRunner(responses: Record<string, string>) {
  return vi.fn((args: string[]) => {
    const key = keyFor(args);
    if (!(key in responses)) {
      throw new Error(`Unexpected git call: ${args.join(' ')}`);
    }

    return responses[key];
  });
}

describe('runPrePush', () => {
  it('no-ops when stdin is empty', () => {
    const runGit = vi.fn(() => '');
    const runQualityChecks = vi.fn();

    const result = runPrePush('', {
      remoteName: 'origin',
      runGit,
      runQualityChecks
    });

    expect(result).toEqual({
      checkedCommitCount: 0,
      hasPushUpdates: false,
      ranQualityChecks: false
    });
    expect(runGit).not.toHaveBeenCalled();
    expect(runQualityChecks).not.toHaveBeenCalled();
  });

  it('skips delete-only pushes', () => {
    const runGit = vi.fn(() => '');
    const runQualityChecks = vi.fn();

    const result = runPrePush(`refs/heads/main ${ALL_ZEROS} refs/heads/main 1234\n`, {
      remoteName: 'origin',
      runGit,
      runQualityChecks
    });

    expect(result).toEqual({
      checkedCommitCount: 0,
      hasPushUpdates: false,
      ranQualityChecks: false
    });
    expect(runGit).not.toHaveBeenCalled();
    expect(runQualityChecks).not.toHaveBeenCalled();
  });

  it('validates commits and runs quality checks once for a normal push', () => {
    const runGit = createGitRunner({
      [keyFor(['rev-list', 'remote1..local1'])]: 'c1\nc2',
      [keyFor(['show', '-s', '--format=%s', 'c1'])]: 'feat(button): add loading',
      [keyFor(['show', '-s', '--format=%b', 'c1'])]: 'Add loading state\nCovers docs',
      [keyFor(['show', '-s', '--format=%s', 'c2'])]: 'fix(input): aria labels',
      [keyFor(['show', '-s', '--format=%b', 'c2'])]: 'Fix label wiring'
    });
    const runQualityChecks = vi.fn();

    const result = runPrePush('refs/heads/main local1 refs/heads/main remote1\n', {
      remoteName: 'origin',
      runGit,
      runQualityChecks
    });

    expect(result).toEqual({
      checkedCommitCount: 2,
      hasPushUpdates: true,
      ranQualityChecks: true
    });
    expect(runQualityChecks).toHaveBeenCalledTimes(1);
  });

  it('deduplicates commits across multiple refs and runs quality checks once', () => {
    const runGit = createGitRunner({
      [keyFor(['rev-list', 'remote-a..local-a'])]: 'c1\nc2',
      [keyFor(['rev-list', 'remote-b..local-b'])]: 'c2\nc3',
      [keyFor(['show', '-s', '--format=%s', 'c1'])]: 'feat(a): first',
      [keyFor(['show', '-s', '--format=%b', 'c1'])]: 'Body line',
      [keyFor(['show', '-s', '--format=%s', 'c2'])]: 'feat(b): second',
      [keyFor(['show', '-s', '--format=%b', 'c2'])]: 'Body line',
      [keyFor(['show', '-s', '--format=%s', 'c3'])]: 'feat(c): third',
      [keyFor(['show', '-s', '--format=%b', 'c3'])]: 'Body line'
    });
    const runQualityChecks = vi.fn();

    const result = runPrePush(
      [
        'refs/heads/main local-a refs/heads/main remote-a',
        'refs/heads/release local-b refs/heads/release remote-b'
      ].join('\n'),
      {
        remoteName: 'origin',
        runGit,
        runQualityChecks
      }
    );

    expect(result).toEqual({
      checkedCommitCount: 3,
      hasPushUpdates: true,
      ranQualityChecks: true
    });
    expect(runQualityChecks).toHaveBeenCalledTimes(1);
    expect(runGit).toHaveBeenCalledWith(['show', '-s', '--format=%s', 'c2']);
    expect(runGit).toHaveBeenCalledTimes(8);
  });

  it('rejects commits with missing bodies before quality checks run', () => {
    const runGit = createGitRunner({
      [keyFor(['rev-list', 'remote1..local1'])]: 'c1',
      [keyFor(['show', '-s', '--format=%s', 'c1'])]: 'feat(button): add icon',
      [keyFor(['show', '-s', '--format=%b', 'c1'])]: '   \n'
    });
    const runQualityChecks = vi.fn();

    let thrown: unknown;
    try {
      runPrePush('refs/heads/main local1 refs/heads/main remote1\n', {
        remoteName: 'origin',
        runGit,
        runQualityChecks
      });
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(PrePushValidationError);
    expect((thrown as Error).message).toContain('missing a body');
    expect(runQualityChecks).not.toHaveBeenCalled();
  });

  it('rejects commits with bodies longer than three lines', () => {
    const runGit = createGitRunner({
      [keyFor(['rev-list', 'remote1..local1'])]: 'c1',
      [keyFor(['show', '-s', '--format=%s', 'c1'])]: 'feat(button): add icon',
      [keyFor(['show', '-s', '--format=%b', 'c1'])]: 'a\nb\nc\nd'
    });

    expect(() =>
      runPrePush('refs/heads/main local1 refs/heads/main remote1\n', {
        remoteName: 'origin',
        runGit,
        runQualityChecks: vi.fn()
      })
    ).toThrowError(/body is too long/);
  });

  it('propagates git failures', () => {
    const runGit = vi.fn((args: string[]) => {
      if (args[0] === 'rev-list') {
        throw new Error('rev-list failed');
      }

      return '';
    });

    expect(() =>
      runPrePush('refs/heads/main local1 refs/heads/main remote1\n', {
        remoteName: 'origin',
        runGit,
        runQualityChecks: vi.fn()
      })
    ).toThrowError('rev-list failed');
  });

  it('propagates quality check failures', () => {
    const runGit = createGitRunner({
      [keyFor(['rev-list', 'remote1..local1'])]: 'c1',
      [keyFor(['show', '-s', '--format=%s', 'c1'])]: 'feat(button): add icon',
      [keyFor(['show', '-s', '--format=%b', 'c1'])]: 'One line body'
    });
    const runQualityChecks = vi.fn(() => {
      throw new Error('pnpm check:prepush failed with exit code 1');
    });

    expect(() =>
      runPrePush('refs/heads/main local1 refs/heads/main remote1\n', {
        remoteName: 'origin',
        runGit,
        runQualityChecks
      })
    ).toThrowError('pnpm check:prepush failed with exit code 1');
    expect(runQualityChecks).toHaveBeenCalledTimes(1);
  });
});
