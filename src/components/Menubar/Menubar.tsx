import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { radii, spacing } from '../../theme/foundations.stylex';

export type MenubarProps = Omit<BaseMenubar.Props, 'className' | 'render' | 'style'>;

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    gap: spacing.sm,
    padding: spacing.sm,
    width: 'fit-content'
  }
});

export function Menubar(props: MenubarProps) {
  return <BaseMenubar {...props} className={stylex.props(styles.root).className} />;
}
