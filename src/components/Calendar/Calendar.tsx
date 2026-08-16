import * as stylex from '@stylexjs/stylex';
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
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

export type CalendarProps = Omit<
  ComponentProps<'div'>,
  'children' | 'className' | 'onChange' | 'style'
> & {
  defaultValue?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  locale?: string;
  max?: string;
  min?: string;
  onValueChange?: (value: string) => void;
  value?: string;
  weekStartsOn?: 0 | 1;
};

const DAY_IN_MILLISECONDS = 86_400_000;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseDate(value: string | undefined) {
  const match = value?.match(ISO_DATE);
  if (!match) return undefined;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return undefined;
  }
  return date;
}

function today() {
  const date = new Date();
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

function toIso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfMonth(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function addDays(date: Date, amount: number) {
  return new Date(date.getTime() + amount * DAY_IN_MILLISECONDS);
}

function addMonths(date: Date, amount: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
}

function moveDateByMonths(date: Date, amount: number) {
  const targetMonth = addMonths(date, amount);
  const daysInMonth = new Date(
    Date.UTC(targetMonth.getUTCFullYear(), targetMonth.getUTCMonth() + 1, 0)
  ).getUTCDate();
  return new Date(
    Date.UTC(
      targetMonth.getUTCFullYear(),
      targetMonth.getUTCMonth(),
      Math.min(date.getUTCDate(), daysInMonth)
    )
  );
}

function isSameMonth(left: Date, right: Date) {
  return (
    left.getUTCFullYear() === right.getUTCFullYear() && left.getUTCMonth() === right.getUTCMonth()
  );
}

function assignRef(ref: Ref<HTMLDivElement> | undefined, node: HTMLDivElement | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

const styles = stylex.create({
  root: {
    backgroundColor: colors.surface,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: colors.text,
    display: 'grid',
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    maxWidth: '100%',
    padding: spacing.lg,
    width: '320px'
  },
  fullWidth: { width: '100%' },
  header: {
    alignItems: 'center',
    display: 'grid',
    gap: spacing.md,
    gridTemplateColumns: '36px 1fr 36px'
  },
  heading: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    margin: 0,
    textAlign: 'center'
  },
  navigation: {
    alignItems: 'center',
    backgroundColor: { default: 'transparent', ':enabled:hover': colors.surfaceSubtle },
    borderColor: colors.borderMuted,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    height: '36px',
    justifyContent: 'center',
    padding: 0,
    width: '36px'
  },
  table: { borderCollapse: 'collapse', tableLayout: 'fixed', width: '100%' },
  weekday: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    height: '28px',
    lineHeight: lineHeights.sm,
    textAlign: 'center'
  },
  cell: { padding: '1px', textAlign: 'center' },
  day: {
    alignItems: 'center',
    backgroundColor: { default: 'transparent', ':enabled:hover': colors.surfaceSubtle },
    borderRadius: radii.sm,
    borderWidth: 0,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    height: '36px',
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    padding: 0,
    width: '36px'
  },
  outside: { color: colors.textMuted },
  selected: {
    backgroundColor: { default: colors.primary, ':enabled:hover': colors.primaryHover },
    color: colors.onEmphasis,
    fontWeight: fontWeights.semibold
  }
});

export function Calendar({
  defaultValue,
  disabled = false,
  fullWidth = false,
  label = 'Calendar',
  locale = 'en-US',
  max,
  min,
  onValueChange,
  ref,
  value,
  weekStartsOn = 0,
  ...props
}: CalendarProps) {
  const controlledDate = parseDate(value);
  const defaultDate = parseDate(defaultValue);
  const initialDate = controlledDate ?? defaultDate ?? today();
  const minDate = parseDate(min);
  const maxDate = parseDate(max);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultDate ? toIso(defaultDate) : undefined
  );
  const selectedValue = value ?? uncontrolledValue;
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(initialDate));
  const [focusDate, setFocusDate] = useState(initialDate);
  const [previousValue, setPreviousValue] = useState(value);
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const shouldFocus = useRef(false);

  if (value !== previousValue) {
    setPreviousValue(value);
    const nextDate = parseDate(value);
    if (nextDate) {
      setViewMonth(startOfMonth(nextDate));
      setFocusDate(nextDate);
    }
  }

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    buttonRefs.current.get(toIso(focusDate))?.focus();
  }, [focusDate, viewMonth]);

  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric'
  });
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeZone: 'UTC'
  });
  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
    weekday: 'short'
  });
  const monthName = monthFormatter.format(viewMonth);
  const firstOffset = (viewMonth.getUTCDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(viewMonth, -firstOffset);
  const dates = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    addDays(new Date(Date.UTC(2026, 7, 2 + weekStartsOn)), index)
  );

  const unavailable = (date: Date) =>
    disabled ||
    Boolean(minDate && date.getTime() < minDate.getTime()) ||
    Boolean(maxDate && date.getTime() > maxDate.getTime());

  const canShowMonth = (month: Date) => {
    const monthEnd = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0));
    return !(
      (minDate && monthEnd.getTime() < minDate.getTime()) ||
      (maxDate && month.getTime() > maxDate.getTime())
    );
  };

  const showMonth = (amount: number) => {
    const nextMonth = addMonths(viewMonth, amount);
    if (!canShowMonth(nextMonth)) return;
    const nextFocus = moveDateByMonths(focusDate, amount);
    setViewMonth(nextMonth);
    setFocusDate(nextFocus);
  };

  const moveFocus = (nextDate: Date) => {
    if (unavailable(nextDate)) return;
    shouldFocus.current = true;
    setFocusDate(nextDate);
    if (!isSameMonth(nextDate, viewMonth)) setViewMonth(startOfMonth(nextDate));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    let nextDate: Date | undefined;
    if (event.key === 'ArrowLeft') nextDate = addDays(date, -1);
    else if (event.key === 'ArrowRight') nextDate = addDays(date, 1);
    else if (event.key === 'ArrowUp') nextDate = addDays(date, -7);
    else if (event.key === 'ArrowDown') nextDate = addDays(date, 7);
    else if (event.key === 'Home') {
      nextDate = addDays(date, -((date.getUTCDay() - weekStartsOn + 7) % 7));
    } else if (event.key === 'End') {
      nextDate = addDays(date, 6 - ((date.getUTCDay() - weekStartsOn + 7) % 7));
    } else if (event.key === 'PageUp') nextDate = moveDateByMonths(date, -1);
    else if (event.key === 'PageDown') nextDate = moveDateByMonths(date, 1);
    if (!nextDate) return;
    event.preventDefault();
    moveFocus(nextDate);
  };

  const select = (date: Date) => {
    const nextValue = toIso(date);
    if (value === undefined) setUncontrolledValue(nextValue);
    setFocusDate(date);
    setViewMonth(startOfMonth(date));
    onValueChange?.(nextValue);
  };

  return (
    <div
      {...props}
      aria-label={label}
      ref={(node) => assignRef(ref, node)}
      role="group"
      {...stylex.props(styles.root, fullWidth && styles.fullWidth)}
    >
      <header {...stylex.props(styles.header)}>
        <button
          aria-label="Previous month"
          disabled={disabled || !canShowMonth(addMonths(viewMonth, -1))}
          type="button"
          onClick={() => showMonth(-1)}
          {...stylex.props(styles.navigation)}
        >
          ‹
        </button>
        <h2 aria-live="polite" {...stylex.props(styles.heading)}>
          {monthName}
        </h2>
        <button
          aria-label="Next month"
          disabled={disabled || !canShowMonth(addMonths(viewMonth, 1))}
          type="button"
          onClick={() => showMonth(1)}
          {...stylex.props(styles.navigation)}
        >
          ›
        </button>
      </header>
      <table aria-label={monthName} role="grid" {...stylex.props(styles.table)}>
        <thead>
          <tr>
            {weekdays.map((weekday) => {
              const fullLabel = new Intl.DateTimeFormat(locale, {
                timeZone: 'UTC',
                weekday: 'long'
              }).format(weekday);
              return (
                <th key={fullLabel} abbr={fullLabel} scope="col" {...stylex.props(styles.weekday)}>
                  {weekdayFormatter.format(weekday)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <tr key={weekIndex}>
              {dates.slice(weekIndex * 7, weekIndex * 7 + 7).map((date) => {
                const iso = toIso(date);
                const selected = selectedValue === iso;
                const dateDisabled = unavailable(date);
                return (
                  <td
                    key={iso}
                    aria-label={dateFormatter.format(date)}
                    aria-selected={selected || undefined}
                    role="gridcell"
                    {...stylex.props(styles.cell)}
                  >
                    <button
                      aria-current={iso === toIso(today()) ? 'date' : undefined}
                      aria-label={dateFormatter.format(date)}
                      disabled={dateDisabled}
                      ref={(node) => {
                        if (node) buttonRefs.current.set(iso, node);
                        else buttonRefs.current.delete(iso);
                      }}
                      tabIndex={iso === toIso(focusDate) ? 0 : -1}
                      type="button"
                      onClick={() => select(date)}
                      onKeyDown={(event) => handleKeyDown(event, date)}
                      {...stylex.props(
                        styles.day,
                        !isSameMonth(date, viewMonth) && styles.outside,
                        selected && styles.selected
                      )}
                    >
                      {date.getUTCDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
