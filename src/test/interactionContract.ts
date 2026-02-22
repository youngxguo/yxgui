import { waitFor } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import { expect } from 'vitest';

export type KeyboardActivationKey = '{Enter}' | '[Space]';

interface KeyboardActivationExpectation {
  user: UserEvent;
  element: HTMLElement;
  key: KeyboardActivationKey;
  expectCalls: () => void | Promise<void>;
}

interface DisabledTabSkipExpectation {
  user: UserEvent;
  firstFocusable: HTMLElement;
  disabledElement: HTMLElement;
  nextFocusable: HTMLElement;
}

interface EscapeDismissAndFocusRestoreExpectation {
  user: UserEvent;
  open: () => void | Promise<void>;
  getLayer: () => HTMLElement | null;
  trigger: HTMLElement;
}

export async function expectReceivesTabFocus(user: UserEvent, element: HTMLElement) {
  await user.tab();
  expect(element).toHaveFocus();
}

export async function expectKeyboardActivation({
  user,
  element,
  key,
  expectCalls
}: KeyboardActivationExpectation) {
  element.focus();
  expect(element).toHaveFocus();

  await user.keyboard(key);
  await expectCalls();
}

export async function expectDisabledElementSkippedByTab({
  user,
  firstFocusable,
  disabledElement,
  nextFocusable
}: DisabledTabSkipExpectation) {
  firstFocusable.focus();
  expect(firstFocusable).toHaveFocus();

  await user.tab();

  expect(nextFocusable).toHaveFocus();
  expect(disabledElement).not.toHaveFocus();
}

export async function expectEscapeDismissesAndRestoresFocus({
  user,
  open,
  getLayer,
  trigger
}: EscapeDismissAndFocusRestoreExpectation) {
  await open();
  expect(getLayer()).toBeInTheDocument();

  await user.keyboard('{Escape}');

  await waitFor(() => expect(getLayer()).toBeNull());
  await waitFor(() => expect(trigger).toHaveFocus());
}
