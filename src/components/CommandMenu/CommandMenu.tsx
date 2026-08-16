import * as stylex from '@stylexjs/stylex';
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  type DialogProps
} from '../Dialog';

export type CommandMenuOption = {
  description?: string;
  disabled?: boolean;
  id: string;
  keywords?: readonly string[];
  label: string;
  shortcut?: string;
};

export type CommandMenuProps = Omit<
  DialogProps,
  'children' | 'defaultOpen' | 'onOpenChange' | 'open'
> & {
  defaultOpen?: boolean;
  description?: ReactNode;
  emptyMessage?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  onSelect: (option: CommandMenuOption) => void;
  open?: boolean;
  options: readonly CommandMenuOption[];
  placeholder?: string;
  searchLabel?: string;
  title?: ReactNode;
  trigger: ReactNode;
};

const styles = stylex.create({
  search: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, '::placeholder': colors.textMuted },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    outline: { default: 'none', ':focus': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    paddingBlock: spacing.md,
    paddingInline: spacing.lg,
    width: '100%'
  },
  list: {
    display: 'grid',
    gap: spacing.sm,
    listStyle: 'none',
    margin: 0,
    maxHeight: '320px',
    overflowY: 'auto',
    padding: 0
  },
  option: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: radii.sm,
    borderWidth: 0,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'flex',
    fontFamily: fontFamilies.sans,
    gap: spacing.lg,
    justifyContent: 'space-between',
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    textAlign: 'left',
    width: '100%'
  },
  highlightedOption: { backgroundColor: colors.surfaceSubtle },
  copy: { display: 'grid', gap: '2px', minWidth: 0 },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  optionDescription: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.sm,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  shortcut: {
    backgroundColor: colors.surface,
    borderColor: colors.borderMuted,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.textMuted,
    flexShrink: 0,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.sm,
    paddingBlock: '2px',
    paddingInline: spacing.sm
  },
  empty: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.xl,
    textAlign: 'center'
  }
});

function matches(option: CommandMenuOption, query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return true;

  return [option.label, option.description, ...(option.keywords ?? [])]
    .filter(Boolean)
    .some((value) => value?.toLocaleLowerCase().includes(normalizedQuery));
}

export function CommandMenu({
  defaultOpen = false,
  description,
  emptyMessage = 'No commands found.',
  onOpenChange,
  onSelect,
  open,
  options,
  placeholder = 'Type a command…',
  searchLabel = 'Search commands',
  title = 'Commands',
  trigger,
  ...props
}: CommandMenuProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const isOpen = open ?? uncontrolledOpen;
  const filteredOptions = options.filter((option) => matches(option, query));
  const selectableOptions = filteredOptions.filter((option) => !option.disabled);
  const activeOption =
    selectableOptions.find((option) => option.id === highlightedId) ?? selectableOptions[0];
  const activeIndex = activeOption ? selectableOptions.indexOf(activeOption) : -1;
  const activeVisibleIndex = activeOption ? filteredOptions.indexOf(activeOption) : -1;

  const changeOpen = (nextOpen: boolean) => {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    if (!nextOpen) {
      setQuery('');
      setHighlightedId(null);
    }
    onOpenChange?.(nextOpen);
  };

  const select = (option: CommandMenuOption) => {
    if (option.disabled) return;
    onSelect(option);
    changeOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (selectableOptions.length === 0) return;

    let nextIndex = activeIndex;
    if (event.key === 'ArrowDown') nextIndex = (activeIndex + 1) % selectableOptions.length;
    else if (event.key === 'ArrowUp')
      nextIndex = (activeIndex - 1 + selectableOptions.length) % selectableOptions.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = selectableOptions.length - 1;
    else if (event.key === 'Enter' && activeOption) {
      event.preventDefault();
      select(activeOption);
      return;
    } else return;

    event.preventDefault();
    setHighlightedId(selectableOptions[nextIndex]?.id ?? null);
  };

  return (
    <Dialog {...props} open={isOpen} onOpenChange={(nextOpen) => changeOpen(nextOpen)}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent initialFocus={inputRef}>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
        <input
          aria-activedescendant={
            activeVisibleIndex >= 0 ? `${listId}-option-${activeVisibleIndex}` : undefined
          }
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded="true"
          aria-label={searchLabel}
          placeholder={placeholder}
          ref={inputRef}
          role="combobox"
          value={query}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setHighlightedId(null);
          }}
          onKeyDown={handleKeyDown}
          {...stylex.props(styles.search)}
        />
        <div aria-label="Commands" id={listId} role="listbox" {...stylex.props(styles.list)}>
          {filteredOptions.map((option, index) => {
            const highlighted = option.id === activeOption?.id;
            return (
              <button
                aria-selected={highlighted}
                disabled={option.disabled}
                id={`${listId}-option-${index}`}
                key={option.id}
                role="option"
                type="button"
                onClick={() => select(option)}
                onMouseMove={() => !option.disabled && setHighlightedId(option.id)}
                {...stylex.props(styles.option, highlighted && styles.highlightedOption)}
              >
                <span {...stylex.props(styles.copy)}>
                  <span {...stylex.props(styles.label)}>{option.label}</span>
                  {option.description && (
                    <span {...stylex.props(styles.optionDescription)}>{option.description}</span>
                  )}
                </span>
                {option.shortcut && <kbd {...stylex.props(styles.shortcut)}>{option.shortcut}</kbd>}
              </button>
            );
          })}
          {filteredOptions.length === 0 && (
            <div {...stylex.props(styles.empty)}>{emptyMessage}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
