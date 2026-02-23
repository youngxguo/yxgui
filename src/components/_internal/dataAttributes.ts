/** Common boolean-ish values encountered in ARIA attributes from DOM props. */
export type AriaBooleanLike = boolean | string | undefined;

/** Maps a truthy value to a present/absent data attribute (`''` vs `undefined`). */
export function getDataPresenceAttribute(value: boolean | null | undefined) {
  return value ? '' : undefined;
}

/** Maps a boolean to a pair of string states for `data-state` style attributes. */
export function getDataStateAttribute<TTrue extends string, TFalse extends string>(
  value: boolean,
  trueState: TTrue,
  falseState: TFalse
): TTrue | TFalse {
  return value ? trueState : falseState;
}

/** Normalizes ARIA boolean values that may arrive as booleans or serialized strings. */
export function isAriaBooleanTrue(value: AriaBooleanLike) {
  return value === true || value === 'true';
}
