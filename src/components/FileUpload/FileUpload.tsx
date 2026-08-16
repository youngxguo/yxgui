import * as stylex from '@stylexjs/stylex';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEventHandler,
  type ComponentProps,
  type ReactNode,
  type Ref
} from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type FileUploadProps = Omit<
  ComponentProps<'input'>,
  'children' | 'className' | 'defaultValue' | 'style' | 'type' | 'value'
> & {
  description?: ReactNode;
  error?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
  onFilesChange?: (files: readonly File[]) => void;
  prompt?: ReactNode;
};

const styles = stylex.create({
  field: { display: 'grid', gap: spacing.sm, maxWidth: '100%', width: '360px' },
  label: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  zone: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'dashed',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: colors.text,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '112px',
    outline: { default: 'none', ':focus-within': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    padding: spacing.xl,
    position: 'relative',
    textAlign: 'center'
  },
  dragging: { backgroundColor: colors.surfaceSubtle, borderColor: colors.primary },
  invalid: { borderColor: colors.danger },
  disabled: { backgroundColor: colors.surfaceDisabled, borderColor: colors.borderDisabled },
  input: {
    cursor: 'pointer',
    height: '100%',
    inset: 0,
    opacity: 0,
    position: 'absolute',
    width: '100%'
  },
  disabledInput: { cursor: 'not-allowed' },
  prompt: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    pointerEvents: 'none'
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  error: {
    color: colors.danger,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  selected: { display: 'grid', gap: spacing.sm },
  selectedHeader: { alignItems: 'center', display: 'flex', justifyContent: 'space-between' },
  selectedLabel: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  clear: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.primary,
    cursor: 'pointer',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    padding: spacing.sm
  },
  list: {
    color: colors.textMuted,
    display: 'grid',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    gap: spacing.sm,
    lineHeight: lineHeights.sm,
    listStylePosition: 'inside',
    margin: 0,
    padding: 0
  }
});

function assignRef(ref: Ref<HTMLInputElement> | undefined, node: HTMLInputElement | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

export function FileUpload({
  description,
  disabled = false,
  error,
  id,
  inputRef,
  label,
  multiple = false,
  onChange,
  onDragEnter,
  onDragLeave,
  onDrop,
  onFilesChange,
  prompt,
  ...props
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const nativeInputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<readonly File[]>([]);
  const describedBy = [description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const form = nativeInputRef.current?.form;
    const reset = () => setFiles([]);
    form?.addEventListener('reset', reset);
    return () => form?.removeEventListener('reset', reset);
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextFiles = Array.from(event.currentTarget.files ?? []);
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
    onChange?.(event);
  };

  const clear = () => {
    if (nativeInputRef.current) nativeInputRef.current.value = '';
    setFiles([]);
    onFilesChange?.([]);
  };

  return (
    <div {...stylex.props(styles.field)}>
      <label htmlFor={inputId} {...stylex.props(styles.label)}>
        {label}
      </label>
      <div
        {...stylex.props(
          styles.zone,
          dragging && styles.dragging,
          Boolean(error) && styles.invalid,
          disabled && styles.disabled
        )}
      >
        <input
          {...props}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          id={inputId}
          multiple={multiple}
          ref={(node) => {
            nativeInputRef.current = node;
            assignRef(inputRef, node);
          }}
          type="file"
          onChange={handleChange}
          onDragEnter={(event) => {
            setDragging(true);
            onDragEnter?.(event);
          }}
          onDragLeave={(event) => {
            setDragging(false);
            onDragLeave?.(event);
          }}
          onDrop={(event) => {
            setDragging(false);
            onDrop?.(event);
          }}
          {...stylex.props(styles.input, disabled && styles.disabledInput)}
        />
        <span {...stylex.props(styles.prompt)}>
          {prompt ??
            (multiple ? 'Choose files or drop them here' : 'Choose a file or drop it here')}
        </span>
      </div>
      {description && (
        <p id={descriptionId} {...stylex.props(styles.description)}>
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" {...stylex.props(styles.error)}>
          {error}
        </p>
      )}
      {files.length > 0 && (
        <div aria-live="polite" {...stylex.props(styles.selected)}>
          <div {...stylex.props(styles.selectedHeader)}>
            <span {...stylex.props(styles.selectedLabel)}>Selected files</span>
            <button
              disabled={disabled}
              type="button"
              onClick={clear}
              {...stylex.props(styles.clear)}
            >
              Clear
            </button>
          </div>
          <ul {...stylex.props(styles.list)}>
            {files.map((file) => (
              <li key={`${file.name}-${file.lastModified}`}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
