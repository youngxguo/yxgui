import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';

export type DrawerSide = 'bottom' | 'right' | 'left';

const drawerStyles = stylex.create({
  contentBase: {
    margin: 0,
    maxHeight: '100vh'
  },
  bottom: {
    alignSelf: 'end',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    maxWidth: '40rem',
    width: '100%'
  },
  right: {
    alignSelf: 'stretch',
    height: '100%',
    marginLeft: 'auto',
    maxWidth: '24rem',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  left: {
    alignSelf: 'stretch',
    height: '100%',
    marginRight: 'auto',
    maxWidth: '24rem',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  header: {
    display: 'grid',
    gap: spacingTokens.xs
  },
  footer: {
    display: 'flex',
    gap: spacingTokens.sm,
    justifyContent: 'flex-end'
  }
});

export function getDrawerContentStyleProps(side: DrawerSide, options?: StyleRecipeOverrides) {
  return composeStyleProps(
    [
      drawerStyles.contentBase,
      side === 'bottom' && drawerStyles.bottom,
      side === 'right' && drawerStyles.right,
      side === 'left' && drawerStyles.left
    ],
    options
  );
}

export function getDrawerHeaderStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([drawerStyles.header], options);
}

export function getDrawerFooterStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([drawerStyles.footer], options);
}
