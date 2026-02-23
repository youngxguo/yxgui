import type { RefObject } from 'react';
import { expect } from 'vitest';

type ElementConstructor<T extends Element> = abstract new (...args: unknown[]) => T;

interface RefTargetExpectation<T extends Element> {
  constructor: ElementConstructor<T>;
  element: Element | null;
  ref: RefObject<T | null>;
}

/** Verifies that a component ref resolves to the expected DOM node and element type. */
export function expectRefTarget<T extends Element>({
  constructor,
  element,
  ref
}: RefTargetExpectation<T>) {
  expect(ref.current).toBeInstanceOf(constructor);
  expect(ref.current).toBe(element);
}
