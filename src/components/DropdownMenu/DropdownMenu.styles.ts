import { getMenuContentStyleProps, getMenuItemStyleProps } from '../../styles/menu';
import type { StyleRecipeOverrides } from '../../styles/recipes';

export function getDropdownMenuContentStyleProps(options?: StyleRecipeOverrides) {
  return getMenuContentStyleProps(options);
}

export function getDropdownMenuItemStyleProps(options?: StyleRecipeOverrides) {
  return getMenuItemStyleProps(options);
}
