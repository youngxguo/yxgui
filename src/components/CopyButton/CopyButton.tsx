import { useEffect, useRef, useState } from 'react';
import { Button, type ButtonProps } from '../Button';

export type CopyButtonStatus = 'copied' | 'error' | 'idle';
export type CopyButtonProps = Omit<ButtonProps, 'children' | 'onClick'> & {
  copiedLabel?: string;
  errorLabel?: string;
  label?: string;
  onCopy?: (value: string) => void;
  onCopyError?: (error: unknown) => void;
  resetDelay?: number;
  value: string;
};

export function CopyButton({
  copiedLabel = 'Copied',
  errorLabel = 'Copy failed',
  label = 'Copy',
  onCopy,
  onCopyError,
  resetDelay = 2000,
  type = 'button',
  value,
  ...props
}: CopyButtonProps) {
  const [status, setStatus] = useState<CopyButtonStatus>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(resetTimer.current);
    },
    []
  );

  const scheduleReset = () => {
    clearTimeout(resetTimer.current);
    if (resetDelay > 0) {
      resetTimer.current = setTimeout(() => setStatus('idle'), resetDelay);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
      onCopy?.(value);
    } catch (error) {
      setStatus('error');
      onCopyError?.(error);
    }
    scheduleReset();
  };

  const currentLabel = status === 'copied' ? copiedLabel : status === 'error' ? errorLabel : label;

  return (
    <Button {...props} type={type} onClick={copy}>
      <span aria-atomic="true" aria-live="polite">
        {currentLabel}
      </span>
    </Button>
  );
}
