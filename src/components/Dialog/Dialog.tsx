import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { overlayStyles } from '../overlayStyles.stylex';
import { useThemePortalContainer } from '../Theme/Theme';

export type DialogProps = BaseDialog.Root.Props;
export type DialogTriggerProps = Omit<BaseDialog.Trigger.Props, 'className' | 'render' | 'style'>;
export type DialogContentProps = Omit<BaseDialog.Popup.Props, 'className' | 'render' | 'style'>;
export type DialogTitleProps = Omit<BaseDialog.Title.Props, 'className' | 'render' | 'style'>;
export type DialogDescriptionProps = Omit<
  BaseDialog.Description.Props,
  'className' | 'render' | 'style'
>;
export type DialogActionsProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type DialogCloseProps = Omit<BaseDialog.Close.Props, 'className' | 'render' | 'style'>;

export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />;
}

export function DialogTrigger(props: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger {...props} className={stylex.props(overlayStyles.trigger).className} />
  );
}

export function DialogContent(props: DialogContentProps) {
  const container = useThemePortalContainer();

  return (
    <BaseDialog.Portal container={container}>
      <BaseDialog.Backdrop className={stylex.props(overlayStyles.backdrop).className} />
      <BaseDialog.Viewport className={stylex.props(overlayStyles.viewport).className}>
        <BaseDialog.Popup
          {...props}
          className={stylex.props(overlayStyles.dialogPopup).className}
        />
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

export function DialogTitle(props: DialogTitleProps) {
  return <BaseDialog.Title {...props} className={stylex.props(overlayStyles.title).className} />;
}

export function DialogDescription(props: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      {...props}
      className={stylex.props(overlayStyles.description).className}
    />
  );
}

export function DialogActions(props: DialogActionsProps) {
  return <div {...props} {...stylex.props(overlayStyles.actions)} />;
}

export function DialogClose(props: DialogCloseProps) {
  return (
    <BaseDialog.Close
      {...props}
      className={stylex.props(overlayStyles.secondaryButton).className}
    />
  );
}
