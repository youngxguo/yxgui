export type AriaBooleanLike = boolean | string | undefined;

export function getDataPresenceAttribute(value: boolean | null | undefined) {
  return value ? '' : undefined;
}

export function getDataStateAttribute<TTrue extends string, TFalse extends string>(
  value: boolean,
  trueState: TTrue,
  falseState: TFalse
): TTrue | TFalse {
  return value ? trueState : falseState;
}

export function isAriaBooleanTrue(value: AriaBooleanLike) {
  return value === true || value === 'true';
}
