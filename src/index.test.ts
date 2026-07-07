import { describe, expect, it } from 'vitest';
import { packageName } from './index';

describe('packageName', () => {
  it('exposes the package name', () => {
    expect(packageName).toBe('yxgui');
  });
});
