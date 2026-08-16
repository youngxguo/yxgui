import * as stylex from '@stylexjs/stylex';
import {
  useId,
  useState,
  type ComponentProps,
  type KeyboardEvent,
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

export type TagInputProps = Omit<
  ComponentProps<'div'>,
  'children' | 'className' | 'defaultValue' | 'onChange' | 'style'
> & {
  allowDuplicates?: boolean;
  defaultValue?: readonly string[];
  description?: ReactNode;
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
  maxTags?: number;
  name?: string;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  value?: readonly string[];
};

const styles = stylex.create({
  field: {
    display: 'grid',
    gap: spacing.sm,
    maxWidth: '100%',
    width: '320px'
  },
  label: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  inputGroup: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
    minHeight: '38px',
    padding: spacing.sm
  },
  disabledGroup: {
    backgroundColor: colors.surfaceDisabled,
    borderColor: colors.borderDisabled
  },
  tag: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.sm,
    color: colors.text,
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    gap: spacing.sm,
    lineHeight: lineHeights.sm,
    maxWidth: '100%',
    paddingLeft: spacing.md
  },
  tagText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  remove: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: { default: 'transparent', ':hover': colors.borderMuted },
    borderWidth: 0,
    color: colors.textMuted,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    justifyContent: 'center',
    minWidth: '24px',
    padding: 0
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: { default: colors.text, '::placeholder': colors.textMuted },
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minWidth: '96px',
    outline: 'none',
    padding: spacing.sm
  },
  disabledInput: { color: colors.textDisabled },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  }
});

export function TagInput({
  allowDuplicates = false,
  defaultValue = [],
  description,
  disabled = false,
  inputRef,
  label,
  maxTags,
  name,
  onValueChange,
  placeholder = 'Add a value…',
  readOnly = false,
  required = false,
  value,
  ...props
}: TagInputProps) {
  const descriptionId = useId();
  const inputId = useId();
  const [draft, setDraft] = useState('');
  const [uncontrolledValue, setUncontrolledValue] = useState(() => [...defaultValue]);
  const tags = value ?? uncontrolledValue;
  const atLimit = maxTags !== undefined && tags.length >= maxTags;

  const update = (nextValue: string[]) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  const add = (candidate: string) => {
    const tag = candidate.trim();
    if (!tag || atLimit || (!allowDuplicates && tags.includes(tag))) return false;
    update([...tags, tag]);
    setDraft('');
    return true;
  };

  const remove = (index: number) => {
    if (disabled || readOnly) return;
    update(tags.filter((_, tagIndex) => tagIndex !== index));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === 'Enter' || event.key === ',') && draft.trim()) {
      event.preventDefault();
      add(draft);
    } else if (event.key === 'Backspace' && draft === '' && tags.length > 0) {
      event.preventDefault();
      remove(tags.length - 1);
    }
  };

  return (
    <div {...props} {...stylex.props(styles.field)}>
      <label htmlFor={inputId} {...stylex.props(styles.label)}>
        {label}
      </label>
      <div {...stylex.props(styles.inputGroup, disabled && styles.disabledGroup)}>
        {tags.map((tag, index) => (
          <span key={`${tag}-${index}`} {...stylex.props(styles.tag)}>
            <span {...stylex.props(styles.tagText)}>{tag}</span>
            {!readOnly && (
              <button
                aria-label={`Remove ${tag}`}
                disabled={disabled}
                type="button"
                onClick={() => remove(index)}
                {...stylex.props(styles.remove)}
              >
                ×
              </button>
            )}
          </span>
        ))}
        <input
          aria-describedby={description ? descriptionId : undefined}
          disabled={disabled}
          id={inputId}
          placeholder={tags.length === 0 ? placeholder : ''}
          readOnly={readOnly || atLimit}
          ref={inputRef}
          required={required && tags.length === 0}
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          {...stylex.props(styles.input, disabled && styles.disabledInput)}
        />
      </div>
      {description && (
        <p id={descriptionId} {...stylex.props(styles.description)}>
          {description}
        </p>
      )}
      {name &&
        tags.map((tag, index) => (
          <input key={`${tag}-${index}`} name={name} type="hidden" value={tag} />
        ))}
    </div>
  );
}
