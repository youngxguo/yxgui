import * as stylex from '@stylexjs/stylex';
import { useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type TreeViewNode = {
  children?: readonly TreeViewNode[];
  description?: ReactNode;
  disabled?: boolean;
  id: string;
  label: string;
};

export type TreeViewProps = Omit<ComponentProps<'div'>, 'children' | 'className' | 'style'> & {
  defaultExpandedIds?: readonly string[];
  defaultSelectedId?: string;
  emptyMessage?: ReactNode;
  expandedIds?: readonly string[];
  label: string;
  nodes: readonly TreeViewNode[];
  onExpandedIdsChange?: (expandedIds: string[]) => void;
  onSelectedIdChange?: (selectedId: string) => void;
  selectedId?: string;
};

type VisibleNode = { node: TreeViewNode; parentId?: string };

const styles = stylex.create({
  tree: {
    color: colors.text,
    display: 'grid',
    fontFamily: fontFamilies.sans,
    gap: spacing.sm,
    maxWidth: '100%',
    width: '320px'
  },
  group: {
    borderColor: colors.borderMuted,
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    display: 'grid',
    gap: spacing.sm,
    marginLeft: spacing.md,
    paddingLeft: spacing.md
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: radii.sm,
    color: colors.text,
    display: 'flex',
    gap: spacing.sm,
    minHeight: '36px',
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    paddingBlock: spacing.sm,
    paddingInline: spacing.md,
    userSelect: 'none'
  },
  selected: { backgroundColor: colors.surfaceSubtle },
  disabled: { color: colors.textDisabled },
  toggle: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.textMuted,
    cursor: 'pointer',
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    height: '24px',
    justifyContent: 'center',
    padding: 0,
    width: '24px'
  },
  spacer: { display: 'inline-block', flexShrink: 0, width: '24px' },
  copy: { display: 'grid', minWidth: 0 },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.sm,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  empty: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    padding: spacing.lg
  }
});

function flattenVisible(
  nodes: readonly TreeViewNode[],
  expandedIds: ReadonlySet<string>,
  parentId?: string
): VisibleNode[] {
  return nodes.flatMap((node) => [
    { node, parentId },
    ...(node.children && expandedIds.has(node.id)
      ? flattenVisible(node.children, expandedIds, node.id)
      : [])
  ]);
}

export function TreeView({
  defaultExpandedIds = [],
  defaultSelectedId,
  emptyMessage = 'No items.',
  expandedIds,
  label,
  nodes,
  onExpandedIdsChange,
  onSelectedIdChange,
  selectedId,
  ...props
}: TreeViewProps) {
  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = useState(
    () => new Set(defaultExpandedIds)
  );
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState(defaultSelectedId);
  const [focusId, setFocusId] = useState(defaultSelectedId);
  const expanded = new Set(expandedIds ?? uncontrolledExpandedIds);
  const selected = selectedId ?? uncontrolledSelectedId;
  const visibleNodes = flattenVisible(nodes, expanded);
  const currentFocusId = visibleNodes.some(({ node }) => node.id === focusId)
    ? focusId
    : visibleNodes[0]?.node.id;

  const focus = (id: string | undefined) => {
    if (!id) return;
    setFocusId(id);
    itemRefs.current.get(id)?.focus();
  };

  const select = (node: TreeViewNode) => {
    if (node.disabled) return;
    if (selectedId === undefined) setUncontrolledSelectedId(node.id);
    onSelectedIdChange?.(node.id);
  };

  const toggle = (node: TreeViewNode, force?: boolean) => {
    if (!node.children?.length || node.disabled) return;
    const next = new Set(expanded);
    const shouldExpand = force ?? !next.has(node.id);
    if (shouldExpand) next.add(node.id);
    else next.delete(node.id);
    if (expandedIds === undefined) setUncontrolledExpandedIds(next);
    onExpandedIdsChange?.([...next]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, item: VisibleNode) => {
    const index = visibleNodes.findIndex(({ node }) => node.id === item.node.id);
    if (event.key === 'ArrowDown') focus(visibleNodes[index + 1]?.node.id);
    else if (event.key === 'ArrowUp') focus(visibleNodes[index - 1]?.node.id);
    else if (event.key === 'Home') focus(visibleNodes[0]?.node.id);
    else if (event.key === 'End') focus(visibleNodes[visibleNodes.length - 1]?.node.id);
    else if (event.key === 'ArrowRight' && item.node.children?.length) {
      if (!expanded.has(item.node.id)) toggle(item.node, true);
      else focus(item.node.children[0]?.id);
    } else if (event.key === 'ArrowLeft') {
      if (expanded.has(item.node.id)) toggle(item.node, false);
      else focus(item.parentId);
    } else if (event.key === 'Enter' || event.key === ' ') select(item.node);
    else return;
    event.preventDefault();
  };

  const renderNodes = (items: readonly TreeViewNode[], parentId?: string) =>
    items.map((node) => {
      const hasChildren = Boolean(node.children?.length);
      const isExpanded = hasChildren && expanded.has(node.id);
      const isSelected = selected === node.id;
      return (
        <div key={node.id}>
          <div
            aria-label={node.label}
            aria-disabled={node.disabled || undefined}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={isSelected}
            ref={(element) => {
              if (element) itemRefs.current.set(node.id, element);
              else itemRefs.current.delete(node.id);
            }}
            role="treeitem"
            tabIndex={currentFocusId === node.id ? 0 : -1}
            onClick={(event) => {
              setFocusId(node.id);
              event.currentTarget.focus();
              select(node);
            }}
            onKeyDown={(event) => handleKeyDown(event, { node, parentId })}
            {...stylex.props(
              styles.row,
              isSelected && styles.selected,
              node.disabled && styles.disabled
            )}
          >
            {hasChildren ? (
              <button
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${String(node.label)}`}
                disabled={node.disabled}
                tabIndex={-1}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  toggle(node);
                }}
                {...stylex.props(styles.toggle)}
              >
                {isExpanded ? '▾' : '▸'}
              </button>
            ) : (
              <span aria-hidden="true" {...stylex.props(styles.spacer)} />
            )}
            <span {...stylex.props(styles.copy)}>
              <span {...stylex.props(styles.label)}>{node.label}</span>
              {node.description && (
                <span {...stylex.props(styles.description)}>{node.description}</span>
              )}
            </span>
          </div>
          {isExpanded && node.children && (
            <div role="group" {...stylex.props(styles.group)}>
              {renderNodes(node.children, node.id)}
            </div>
          )}
        </div>
      );
    });

  return (
    <div {...props} aria-label={label} role="tree" {...stylex.props(styles.tree)}>
      {nodes.length > 0 ? (
        renderNodes(nodes)
      ) : (
        <div {...stylex.props(styles.empty)}>{emptyMessage}</div>
      )}
    </div>
  );
}
