import { expect } from 'vitest';

interface ForwardedCorePropsExpectation {
  element: HTMLElement;
  id?: string;
  name?: string;
  title?: string;
  ariaLabel?: string;
  dataContract?: string;
  className?: string;
  styleColor?: string;
}

/**
 * Shared assertions for verifying that components forward common DOM props to their root element.
 */
export function expectForwardedCoreProps({
  element,
  id,
  name,
  title,
  ariaLabel,
  dataContract,
  className,
  styleColor
}: ForwardedCorePropsExpectation) {
  if (id !== undefined) {
    expect(element).toHaveAttribute('id', id);
  }

  if (name !== undefined) {
    expect(element).toHaveAttribute('name', name);
  }

  if (title !== undefined) {
    expect(element).toHaveAttribute('title', title);
  }

  if (ariaLabel !== undefined) {
    expect(element).toHaveAttribute('aria-label', ariaLabel);
  }

  if (dataContract !== undefined) {
    expect(element).toHaveAttribute('data-contract', dataContract);
  }

  if (className !== undefined) {
    expect(element.className).toContain(className);
  }

  if (styleColor !== undefined) {
    expect(element.style.color).toBe(styleColor);
  }
}
