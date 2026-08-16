import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { overlayStyles } from '../overlayStyles.stylex';
import { useThemePortalContainer } from '../Theme/Theme';

export type AlertDialogProps = BaseAlertDialog.Root.Props;
export type AlertDialogTriggerProps = Omit<
  BaseAlertDialog.Trigger.Props,
  'className' | 'render' | 'style'
>;
export type AlertDialogContentProps = Omit<
  BaseAlertDialog.Popup.Props,
  'className' | 'render' | 'style'
>;
export type AlertDialogTitleProps = Omit<
  BaseAlertDialog.Title.Props,
  'className' | 'render' | 'style'
>;
export type AlertDialogDescriptionProps = Omit<
  BaseAlertDialog.Description.Props,
  'className' | 'render' | 'style'
>;
export type AlertDialogActionsProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type AlertDialogCancelProps = Omit<
  BaseAlertDialog.Close.Props,
  'className' | 'render' | 'style'
>;
export type AlertDialogActionProps = AlertDialogCancelProps;

export function AlertDialog(props: AlertDialogProps) {
  return <BaseAlertDialog.Root {...props} />;
}

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger {...props} className={stylex.props(overlayStyles.trigger).className} />
  );
}

export function AlertDialogContent(props: AlertDialogContentProps) {
  const container = useThemePortalContainer();

  return (
    <BaseAlertDialog.Portal container={container}>
      <BaseAlertDialog.Backdrop className={stylex.props(overlayStyles.backdrop).className} />
      <BaseAlertDialog.Viewport className={stylex.props(overlayStyles.viewport).className}>
        <BaseAlertDialog.Popup
          {...props}
          className={stylex.props(overlayStyles.dialogPopup).className}
        />
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  );
}

export function AlertDialogTitle(props: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title {...props} className={stylex.props(overlayStyles.title).className} />
  );
}

export function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      {...props}
      className={stylex.props(overlayStyles.description).className}
    />
  );
}

export function AlertDialogActions(props: AlertDialogActionsProps) {
  return <div {...props} {...stylex.props(overlayStyles.actions)} />;
}

export function AlertDialogCancel(props: AlertDialogCancelProps) {
  return (
    <BaseAlertDialog.Close
      {...props}
      className={stylex.props(overlayStyles.secondaryButton).className}
    />
  );
}

export function AlertDialogAction(props: AlertDialogActionProps) {
  return (
    <BaseAlertDialog.Close
      {...props}
      className={stylex.props(overlayStyles.dangerButton).className}
    />
  );
}
