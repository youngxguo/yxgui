import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, radii, spacing } from '../../theme/foundations.stylex';

export type ToolbarProps = Omit<BaseToolbar.Root.Props, 'className' | 'render' | 'style'>;
export type ToolbarGroupProps = Omit<BaseToolbar.Group.Props, 'className' | 'render' | 'style'>;
export type ToolbarButtonProps = Omit<BaseToolbar.Button.Props, 'className' | 'render' | 'style'>;
export type ToolbarLinkProps = Omit<BaseToolbar.Link.Props, 'className' | 'render' | 'style'>;
export type ToolbarInputProps = Omit<BaseToolbar.Input.Props, 'className' | 'render' | 'style'>;
export type ToolbarSeparatorProps = Omit<
  BaseToolbar.Separator.Props,
  'className' | 'render' | 'style'
>;

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    fontFamily: fontFamilies.sans,
    gap: spacing.sm,
    padding: spacing.sm
  },
  vertical: { alignItems: 'stretch', flexDirection: 'column' },
  group: { alignItems: 'center', display: 'flex', gap: spacing.sm },
  verticalGroup: { alignItems: 'stretch', flexDirection: 'column' },
  button: {
    backgroundColor: { default: 'transparent', ':hover': colors.surfaceSubtle },
    borderColor: 'transparent',
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    minHeight: '32px',
    paddingInline: spacing.md
  },
  link: {
    alignItems: 'center',
    borderRadius: radii.sm,
    color: { default: colors.primary, ':hover': colors.primaryHover },
    display: 'inline-flex',
    fontSize: fontSizes.sm,
    minHeight: '32px',
    paddingInline: spacing.md,
    textDecoration: { default: 'none', ':hover': 'underline' }
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    minHeight: '32px',
    paddingInline: spacing.md
  },
  separator: { backgroundColor: colors.borderMuted, flexShrink: 0 },
  horizontalSeparator: { height: '1px', width: '100%' },
  verticalSeparator: { height: '24px', width: '1px' }
});

export function Toolbar(props: ToolbarProps) {
  return (
    <BaseToolbar.Root
      {...props}
      className={(state) =>
        stylex.props(styles.root, state.orientation === 'vertical' && styles.vertical).className
      }
    />
  );
}
export function ToolbarGroup(props: ToolbarGroupProps) {
  return (
    <BaseToolbar.Group
      {...props}
      className={(state) =>
        stylex.props(styles.group, state.orientation === 'vertical' && styles.verticalGroup)
          .className
      }
    />
  );
}
export function ToolbarButton(props: ToolbarButtonProps) {
  return <BaseToolbar.Button {...props} className={stylex.props(styles.button).className} />;
}
export function ToolbarLink(props: ToolbarLinkProps) {
  return <BaseToolbar.Link {...props} className={stylex.props(styles.link).className} />;
}
export function ToolbarInput(props: ToolbarInputProps) {
  return <BaseToolbar.Input {...props} className={stylex.props(styles.input).className} />;
}
export function ToolbarSeparator(props: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      {...props}
      className={(state) =>
        stylex.props(
          styles.separator,
          state.orientation === 'horizontal' ? styles.horizontalSeparator : styles.verticalSeparator
        ).className
      }
    />
  );
}
