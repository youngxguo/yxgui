import { defaultTheme } from './defaultTheme';
import type { Theme, ThemeOptions } from './types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeThemeValue<T>(base: T, override: unknown): T {
  if (!isRecord(base) || !isRecord(override)) {
    return (override as T) ?? base;
  }

  const merged: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) {
      continue;
    }

    const current = merged[key];
    merged[key] = isRecord(current) && isRecord(value) ? mergeThemeValue(current, value) : value;
  }

  return merged as T;
}

export function createTheme(options?: ThemeOptions): Theme {
  return mergeThemeValue(defaultTheme, options ?? {});
}
