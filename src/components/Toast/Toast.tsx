import { Toast as BaseToast } from '@base-ui/react/toast';
import type {
  ToastManagerAddOptions as BaseToastManagerAddOptions,
  ToastManagerUpdateOptions as BaseToastManagerUpdateOptions
} from '@base-ui/react/toast';
import * as stylex from '@stylexjs/stylex';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';
import { useThemePortalContainer } from '../Theme/Theme';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export type ToastAction = {
  label: ReactNode;
  onClick: () => void;
};

export type ToastOptions = {
  action?: ToastAction;
  description?: ReactNode;
  id?: string;
  onClose?: () => void;
  onRemove?: () => void;
  priority?: 'low' | 'high';
  timeout?: number;
  title?: ReactNode;
  variant?: ToastVariant;
};

export type ToastUpdateOptions = Partial<Omit<ToastOptions, 'id'>>;

type ToastPromiseState = string | ToastUpdateOptions;

export type ToastPromiseOptions<Value> = {
  error: ToastPromiseState | ((error: unknown) => ToastPromiseState);
  loading: ToastPromiseState;
  success: ToastPromiseState | ((value: Value) => ToastPromiseState);
};

export type ToastManager = {
  add: (options: ToastOptions) => string;
  close: (id?: string) => void;
  promise: <Value>(promise: Promise<Value>, options: ToastPromiseOptions<Value>) => Promise<Value>;
  update: (id: string, options: ToastUpdateOptions) => void;
};

export type ToastProviderProps = Pick<BaseToast.Provider.Props, 'limit' | 'timeout'> & {
  children: ReactNode;
};

type ToastData = {
  variant: ToastVariant;
};

const ToastManagerContext = createContext<ToastManager | null>(null);

const styles = stylex.create({
  viewport: {
    bottom: spacing.lg,
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: spacing.md,
    maxWidth: 'calc(100vw - 32px)',
    outline: 'none',
    pointerEvents: 'none',
    position: 'fixed',
    right: spacing.lg,
    width: '360px',
    zIndex: 1200
  },
  root: {
    backgroundColor: colors.surfaceElevated,
    borderBottomColor: colors.borderMuted,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftWidth: '4px',
    borderRadius: radii.md,
    borderRightColor: colors.borderMuted,
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    borderTopColor: colors.borderMuted,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    boxShadow: '0 12px 36px rgba(17, 24, 39, 0.2)',
    boxSizing: 'border-box',
    color: colors.text,
    opacity: 1,
    pointerEvents: 'auto',
    transform: 'translateX(0)',
    transition: 'opacity 180ms ease, transform 180ms ease',
    width: '100%'
  },
  info: { borderLeftColor: colors.info },
  success: { borderLeftColor: colors.success },
  warning: { borderLeftColor: colors.warning },
  danger: { borderLeftColor: colors.danger },
  starting: { opacity: 0, transform: 'translateY(8px)' },
  ending: { opacity: 0, transform: 'translateX(24px)' },
  limited: { display: 'none' },
  content: {
    alignItems: 'start',
    display: 'grid',
    gap: spacing.md,
    gridTemplateColumns: 'minmax(0, 1fr) auto auto',
    padding: spacing.lg
  },
  text: {
    display: 'grid',
    gap: spacing.sm,
    minWidth: 0
  },
  title: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  action: {
    backgroundColor: { default: 'transparent', ':hover': colors.surfaceSubtle },
    borderColor: colors.borderMuted,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.text,
    cursor: 'pointer',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.sm,
    paddingInline: spacing.md
  },
  close: {
    alignItems: 'center',
    backgroundColor: { default: 'transparent', ':hover': colors.surfaceSubtle },
    borderWidth: 0,
    borderRadius: radii.sm,
    color: colors.textMuted,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    height: '28px',
    justifyContent: 'center',
    lineHeight: lineHeights.md,
    padding: 0,
    width: '28px'
  },
  visuallyHidden: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  }
});

function toActionProps(action: ToastAction | undefined) {
  return action
    ? {
        children: action.label,
        onClick: action.onClick
      }
    : undefined;
}

function toAddOptions(options: ToastOptions): BaseToastManagerAddOptions<ToastData> {
  const { action, variant = 'info', ...rest } = options;
  return {
    ...rest,
    actionProps: toActionProps(action),
    data: { variant },
    type: variant
  };
}

function toUpdateOptions(options: ToastUpdateOptions): BaseToastManagerUpdateOptions<ToastData> {
  const { action, variant, ...rest } = options;
  return {
    ...rest,
    ...('action' in options ? { actionProps: toActionProps(action) } : null),
    ...(variant ? { data: { variant }, type: variant } : null)
  };
}

function toPromiseState(state: ToastPromiseState, variant: ToastVariant) {
  return typeof state === 'string'
    ? toUpdateOptions({ title: state, variant })
    : toUpdateOptions({ variant, ...state });
}

function ToastProviderContents({ children }: { children: ReactNode }) {
  const manager = BaseToast.useToastManager<ToastData>();
  const { add, close, promise: managePromise, toasts, update } = manager;
  const container = useThemePortalContainer();
  const publicManager = useMemo<ToastManager>(
    () => ({
      add: (options) => add(toAddOptions(options)),
      close,
      promise: (promise, options) => {
        const error = options.error;
        const success = options.success;
        return managePromise(promise, {
          error:
            typeof error === 'function'
              ? (reason) => toPromiseState(error(reason), 'danger')
              : toPromiseState(error, 'danger'),
          loading: toPromiseState(options.loading, 'info'),
          success:
            typeof success === 'function'
              ? (value) => toPromiseState(success(value), 'success')
              : toPromiseState(success, 'success')
        });
      },
      update: (id, options) => update(id, toUpdateOptions(options))
    }),
    [add, close, managePromise, update]
  );

  return (
    <ToastManagerContext.Provider value={publicManager}>
      {children}
      <BaseToast.Portal container={container}>
        <BaseToast.Viewport className={stylex.props(styles.viewport).className}>
          {toasts.map((toast) => (
            <BaseToast.Root
              key={toast.id}
              toast={toast}
              className={(state) =>
                stylex.props(
                  styles.root,
                  styles[(state.type as ToastVariant | undefined) ?? 'info'],
                  state.transitionStatus === 'starting' && styles.starting,
                  state.transitionStatus === 'ending' && styles.ending,
                  state.limited && styles.limited
                ).className
              }
              swipeDirection="right"
            >
              <BaseToast.Content className={stylex.props(styles.content).className}>
                <div {...stylex.props(styles.text)}>
                  {toast.title && (
                    <BaseToast.Title className={stylex.props(styles.title).className} />
                  )}
                  {toast.description && (
                    <BaseToast.Description className={stylex.props(styles.description).className} />
                  )}
                </div>
                {toast.actionProps && (
                  <BaseToast.Action className={stylex.props(styles.action).className} />
                )}
                <BaseToast.Close className={stylex.props(styles.close).className}>
                  <span aria-hidden="true">×</span>
                  <span {...stylex.props(styles.visuallyHidden)}>Dismiss notification</span>
                </BaseToast.Close>
              </BaseToast.Content>
            </BaseToast.Root>
          ))}
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </ToastManagerContext.Provider>
  );
}

export function ToastProvider({ children, limit = 3, timeout = 5000 }: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit} timeout={timeout}>
      <ToastProviderContents>{children}</ToastProviderContents>
    </BaseToast.Provider>
  );
}

export function useToast() {
  const manager = useContext(ToastManagerContext);
  if (!manager) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return manager;
}
