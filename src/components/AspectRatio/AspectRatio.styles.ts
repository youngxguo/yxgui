import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';

const aspectRatioStyles = stylex.create({
  root: {
    display: 'block',
    position: 'relative',
    width: '100%'
  },
  spacer: {
    display: 'block',
    width: '100%'
  },
  content: {
    inset: 0,
    position: 'absolute'
  }
});

export function getAspectRatioRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([aspectRatioStyles.root], options);
}

export function getAspectRatioSpacerStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([aspectRatioStyles.spacer], options);
}

export function getAspectRatioContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([aspectRatioStyles.content], options);
}
