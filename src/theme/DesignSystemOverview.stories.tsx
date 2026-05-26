import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldLabel,
  Input,
  Progress,
  Select,
  Separator,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Typography
} from '../index';
import { uiPrimitiveDefinitions } from '../styles/primitives';
import {
  badgeStyleTokens,
  borderTokens,
  colorTokens,
  buttonInteractionTokens,
  buttonVariantTokens,
  cardElevationTokens,
  componentSizeTokens,
  controlTokens,
  layerTokens,
  motionTokens,
  overlayTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  statusTokens,
  surfaceTokens,
  typographyTokens,
  validationTokens
} from '../index';

type TokenValue = string | number;
type TokenMap = Record<string, TokenValue>;

type ValueKind = 'color' | 'size' | 'shadow' | 'font-family' | 'number' | 'string' | 'other';

interface TokenGroup {
  name: string;
  id: string;
  description: string;
  tokens: TokenMap;
}

interface ValueOccurrence {
  path: string;
  group: string;
  key: string;
  value: TokenValue;
  source: 'token' | 'primitive';
}

interface DuplicateCluster {
  value: string;
  occurrences: ValueOccurrence[];
}

const tokenGroups: TokenGroup[] = [
  {
    id: 'color',
    name: 'Color',
    description: 'Core semantic text and accent colors used across components.',
    tokens: colorTokens as unknown as TokenMap
  },
  {
    id: 'surface',
    name: 'Surface',
    description: 'Layered surface fills for cards, hover states, insets, and subtle emphasis.',
    tokens: surfaceTokens as unknown as TokenMap
  },
  {
    id: 'overlay',
    name: 'Overlay',
    description: 'Scrim and overlay colors used behind modal and floating layers.',
    tokens: overlayTokens as unknown as TokenMap
  },
  {
    id: 'border',
    name: 'Border',
    description: 'Border widths and border colors, including focus treatment.',
    tokens: borderTokens as unknown as TokenMap
  },
  {
    id: 'control',
    name: 'Control',
    description: 'Default form control colors (base, placeholder, disabled, and focus).',
    tokens: controlTokens as unknown as TokenMap
  },
  {
    id: 'status',
    name: 'Status',
    description: 'Feedback colors for info, success, warning, and error states.',
    tokens: statusTokens as unknown as TokenMap
  },
  {
    id: 'validation',
    name: 'Validation',
    description: 'Validation accents shared by form controls and field messaging.',
    tokens: validationTokens as unknown as TokenMap
  },
  {
    id: 'layer',
    name: 'Layer',
    description: 'Stacking layers for local UI and floating overlays.',
    tokens: layerTokens as unknown as TokenMap
  },
  {
    id: 'shadow',
    name: 'Shadow',
    description: 'Shared elevation shadows for floating surfaces and controls.',
    tokens: shadowTokens as unknown as TokenMap
  },
  {
    id: 'motion',
    name: 'Motion',
    description: 'Durations and easing curves for transitions and entrance animations.',
    tokens: motionTokens as unknown as TokenMap
  },
  {
    id: 'spacing',
    name: 'Spacing',
    description: 'Primary spacing scale for gaps, padding, and compact control dimensions.',
    tokens: spacingTokens as unknown as TokenMap
  },
  {
    id: 'radius',
    name: 'Radius',
    description: 'Corner radius scale for surfaces, controls, and pill shapes.',
    tokens: radiusTokens as unknown as TokenMap
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Font families, weights, type scale, line heights, and letter spacing.',
    tokens: typographyTokens as unknown as TokenMap
  },
  {
    id: 'buttonVariant',
    name: 'Button Variants',
    description: 'Semantic button-like foreground/background/border combinations.',
    tokens: buttonVariantTokens as unknown as TokenMap
  },
  {
    id: 'buttonInteraction',
    name: 'Button Interaction',
    description: 'Button-specific shadows, disabled colors, and pressed offset values.',
    tokens: buttonInteractionTokens as unknown as TokenMap
  },
  {
    id: 'badgeStyle',
    name: 'Badge Style',
    description: 'Badge-specific semantic defaults.',
    tokens: badgeStyleTokens as unknown as TokenMap
  },
  {
    id: 'cardElevation',
    name: 'Card Elevation',
    description: 'Card-only elevation/shadow tuning so card changes remain isolated.',
    tokens: cardElevationTokens as unknown as TokenMap
  },
  {
    id: 'componentSize',
    name: 'Component Size',
    description:
      'Component-specific fixed dimensions that intentionally sit outside spacing scale.',
    tokens: componentSizeTokens as unknown as TokenMap
  }
];

function formatTokenValue(value: TokenValue): string {
  return typeof value === 'number' ? `${value}` : value;
}

function looksLikeColor(value: string): boolean {
  return /^(#|rgb\(|rgba\(|hsl\(|hsla\()/i.test(value);
}

function looksLikeShadow(value: string): boolean {
  return value.includes('px') && value.includes(',');
}

function looksLikeFontFamilyKey(key: string): boolean {
  return key.toLowerCase().includes('fontfamily');
}

function looksLikeSize(value: TokenValue): boolean {
  if (typeof value === 'number') {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  return /^-?\d+(\.\d+)?(px|rem|em|%)$/.test(value);
}

function getValueKind(key: string, value: TokenValue): ValueKind {
  const stringValue = formatTokenValue(value);
  const lowerKey = key.toLowerCase();

  if (looksLikeColor(stringValue)) {
    return 'color';
  }

  if (looksLikeShadow(stringValue)) {
    return 'shadow';
  }

  if (looksLikeFontFamilyKey(key)) {
    return 'font-family';
  }

  if (looksLikeSize(value)) {
    return 'size';
  }

  if (lowerKey.includes('fontweight') || lowerKey.includes('lineheight')) {
    return 'number';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (typeof value === 'number') {
    return 'number';
  }

  return 'other';
}

function parseSizeToPixels(value: TokenValue): number | null {
  if (typeof value === 'number') {
    return value;
  }

  if (/^-?\d+(\.\d+)?px$/.test(value)) {
    return Number.parseFloat(value);
  }

  if (/^-?\d+(\.\d+)?rem$/.test(value)) {
    return Number.parseFloat(value) * 16;
  }

  return null;
}

function clampPreviewWidth(value: number): number {
  return Math.max(6, Math.min(72, Math.round(value)));
}

function ValuePreview(props: { keyName: string; value: TokenValue }) {
  const { keyName, value } = props;
  const stringValue = formatTokenValue(value);
  const kind = getValueKind(keyName, value);

  if (kind === 'color') {
    return (
      <span
        aria-hidden="true"
        style={{
          backgroundColor: stringValue,
          border: '1px solid #cfcec5',
          borderRadius: 999,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5)',
          display: 'inline-block',
          height: 14,
          width: 38
        }}
      />
    );
  }

  if (kind === 'shadow') {
    return (
      <span
        aria-hidden="true"
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e3e1d7',
          borderRadius: 6,
          boxShadow: stringValue,
          display: 'inline-block',
          height: 16,
          width: 28
        }}
      />
    );
  }

  if (kind === 'size') {
    const px = parseSizeToPixels(value);
    const width = clampPreviewWidth(px ?? 8);

    return (
      <span
        aria-hidden="true"
        style={{
          alignItems: 'center',
          backgroundColor: '#f4f4ef',
          border: '1px solid #e3e1d7',
          borderRadius: 999,
          display: 'inline-flex',
          height: 14,
          padding: 2,
          width: 78
        }}
      >
        <span
          style={{
            backgroundColor: '#2855f2',
            borderRadius: 999,
            display: 'inline-block',
            height: 8,
            width
          }}
        />
      </span>
    );
  }

  if (kind === 'font-family') {
    return (
      <span
        style={{
          display: 'inline-block',
          fontFamily: stringValue,
          fontSize: 12,
          maxWidth: 90,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        Aa 012
      </span>
    );
  }

  if (keyName.toLowerCase().includes('fontweight')) {
    return (
      <span style={{ display: 'inline-block', fontSize: 12, fontWeight: Number(stringValue) }}>
        Weight
      </span>
    );
  }

  if (keyName.toLowerCase().includes('letterspacing')) {
    return (
      <span style={{ display: 'inline-block', fontSize: 12, letterSpacing: stringValue }}>
        Track
      </span>
    );
  }

  if (keyName.toLowerCase().includes('lineheight')) {
    return (
      <span style={{ display: 'inline-block', fontSize: 12, lineHeight: Number(stringValue) }}>
        Line
      </span>
    );
  }

  return (
    <Typography as="span" variant="muted">
      n/a
    </Typography>
  );
}

function flattenStyleLeaves(
  input: unknown,
  pathParts: string[] = []
): Array<{ path: string; value: TokenValue }> {
  if (typeof input === 'string' || typeof input === 'number') {
    return [{ path: pathParts.join('.'), value: input }];
  }

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return [];
  }

  return Object.entries(input).flatMap(([key, nested]) =>
    flattenStyleLeaves(nested, [...pathParts, key])
  );
}

function getPrimitiveOccurrences(): ValueOccurrence[] {
  return Object.entries(uiPrimitiveDefinitions).flatMap(([primitiveName, primitiveDefinition]) =>
    flattenStyleLeaves(primitiveDefinition, [primitiveName]).map((leaf) => {
      const key = leaf.path.slice(primitiveName.length + 1);

      return {
        path: `uiPrimitives.${leaf.path}`,
        group: primitiveName,
        key,
        source: 'primitive',
        value: leaf.value
      } satisfies ValueOccurrence;
    })
  );
}

function getTokenOccurrences(groups: TokenGroup[]): ValueOccurrence[] {
  return groups.flatMap((group) =>
    Object.entries(group.tokens).map(([key, value]) => ({
      path: `${group.id}Tokens.${key}`,
      group: group.name,
      key,
      source: 'token',
      value
    }))
  );
}

function getDuplicateClusters(occurrences: ValueOccurrence[]): DuplicateCluster[] {
  const byValue = new Map<string, ValueOccurrence[]>();

  for (const occurrence of occurrences) {
    const valueKey = formatTokenValue(occurrence.value);
    const current = byValue.get(valueKey);

    if (current) {
      current.push(occurrence);
      continue;
    }

    byValue.set(valueKey, [occurrence]);
  }

  return [...byValue.entries()]
    .filter(([, clusterOccurrences]) => clusterOccurrences.length > 1)
    .map(([value, clusterOccurrences]) => ({
      value,
      occurrences: [...clusterOccurrences].sort((left, right) =>
        left.path.localeCompare(right.path)
      )
    }))
    .sort((left, right) => {
      if (right.occurrences.length !== left.occurrences.length) {
        return right.occurrences.length - left.occurrences.length;
      }

      return left.value.localeCompare(right.value);
    });
}

function getDuplicateCountByPath(duplicateClusters: DuplicateCluster[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const cluster of duplicateClusters) {
    const duplicateCount = cluster.occurrences.length - 1;

    for (const occurrence of cluster.occurrences) {
      counts.set(occurrence.path, duplicateCount);
    }
  }

  return counts;
}

function ValueKindBadge(props: { kind: ValueKind }) {
  const { kind } = props;
  return <Badge variant="outline">{kind}</Badge>;
}

function RepeatBadge(props: { count: number }) {
  const { count } = props;

  if (count <= 0) {
    return <Typography variant="muted">unique</Typography>;
  }

  return <Badge>{`${count} repeats`}</Badge>;
}

function ValueCode(props: { value: TokenValue }) {
  const { value } = props;
  return (
    <Typography as="code" variant="code">
      {formatTokenValue(value)}
    </Typography>
  );
}

function InventorySnapshotCard(props: {
  duplicateClusters: DuplicateCluster[];
  duplicateReferenceCount: number;
  primitiveOccurrences: ValueOccurrence[];
  tokenOccurrences: ValueOccurrence[];
  uniqueValueCount: number;
}) {
  const {
    duplicateClusters,
    duplicateReferenceCount,
    primitiveOccurrences,
    tokenOccurrences,
    uniqueValueCount
  } = props;
  const metricRows = [
    { label: 'Token groups', value: tokenGroups.length },
    { label: 'Semantic tokens', value: tokenOccurrences.length },
    { label: 'Primitive leaves', value: primitiveOccurrences.length },
    { label: 'Unique literal values', value: uniqueValueCount },
    { label: 'Repeated values', value: duplicateClusters.length },
    { label: 'Repeated references (beyond first)', value: duplicateReferenceCount }
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design System Overview</CardTitle>
        <CardDescription>
          Component-only audit view for tokens and style primitives. This page intentionally avoids
          custom story styling and is composed from yxgui primitives.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Inventory snapshot across semantic tokens and ui primitive leaf values.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Metric</TableHead>
              <TableHead scope="col">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metricRows.map((row) => (
              <TableRow key={row.label}>
                <TableCell>{row.label}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TokenGroupRows(props: { duplicateCountByPath: Map<string, number>; group: TokenGroup }) {
  const { duplicateCountByPath, group } = props;
  const rows = Object.entries(group.tokens).sort(([left], [right]) => left.localeCompare(right));

  return (
    <Table>
      <TableCaption>{group.description}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Token</TableHead>
          <TableHead scope="col">Preview</TableHead>
          <TableHead scope="col">Value</TableHead>
          <TableHead scope="col">Kind</TableHead>
          <TableHead scope="col">Repetition</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(([key, value]) => {
          const path = `${group.id}Tokens.${key}`;
          const duplicateCount = duplicateCountByPath.get(path) ?? 0;

          return (
            <TableRow key={path}>
              <TableCell>
                <Typography as="code" variant="code">
                  {key}
                </Typography>
              </TableCell>
              <TableCell>
                <ValuePreview keyName={key} value={value} />
              </TableCell>
              <TableCell>
                <ValueCode value={value} />
              </TableCell>
              <TableCell>
                <ValueKindBadge kind={getValueKind(key, value)} />
              </TableCell>
              <TableCell>
                <RepeatBadge count={duplicateCount} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function TokenCatalogPanel(props: {
  duplicateCountByPath: Map<string, number>;
  groups: TokenGroup[];
}) {
  const { duplicateCountByPath, groups } = props;

  return (
    <>
      <CardHeader>
        <CardTitle>Semantic Token Catalog</CardTitle>
        <CardDescription>
          Organized by intent. Each group expands to a token table with exact values, value type,
          and repetition counts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={groups.map((group) => group.id)}>
          {groups.map((group) => (
            <AccordionItem key={group.id} value={group.id}>
              <AccordionTrigger>{`${group.name} (${Object.keys(group.tokens).length})`}</AccordionTrigger>
              <AccordionContent>
                <TokenGroupRows duplicateCountByPath={duplicateCountByPath} group={group} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </>
  );
}

function DuplicateClusterTable(props: { cluster: DuplicateCluster }) {
  const { cluster } = props;

  return (
    <Table>
      <TableCaption>{`All references that share the literal value ${cluster.value}.`}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Reference</TableHead>
          <TableHead scope="col">Source</TableHead>
          <TableHead scope="col">Group</TableHead>
          <TableHead scope="col">Key</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cluster.occurrences.map((occurrence) => (
          <TableRow key={occurrence.path}>
            <TableCell>
              <Typography as="code" variant="code">
                {occurrence.path}
              </Typography>
            </TableCell>
            <TableCell>
              <Badge variant={occurrence.source === 'token' ? 'neutral' : 'outline'}>
                {occurrence.source}
              </Badge>
            </TableCell>
            <TableCell>{occurrence.group}</TableCell>
            <TableCell>
              <Typography as="code" variant="code">
                {occurrence.key || '(root)'}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RepeatsPanel(props: { duplicateClusters: DuplicateCluster[] }) {
  const { duplicateClusters } = props;

  return (
    <>
      <CardHeader>
        <CardTitle>Repeated Values</CardTitle>
        <CardDescription>
          Exact literal matches across semantic tokens and ui primitive leaf declarations.
          Repetition may indicate either intentional aliases or consolidation opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {duplicateClusters.length === 0 ? (
          <Typography variant="muted">No repeated literal values were found.</Typography>
        ) : (
          <Accordion
            type="multiple"
            defaultValue={duplicateClusters.slice(0, 3).map((cluster) => cluster.value)}
          >
            {duplicateClusters.map((cluster) => (
              <AccordionItem key={cluster.value} value={cluster.value}>
                <AccordionTrigger>
                  {`${cluster.value} (${cluster.occurrences.length} references)`}
                </AccordionTrigger>
                <AccordionContent>
                  <DuplicateClusterTable cluster={cluster} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </>
  );
}

function PrimitiveRows(props: {
  duplicateCountByPath: Map<string, number>;
  primitiveName: string;
}) {
  const { duplicateCountByPath, primitiveName } = props;
  const primitiveDefinition =
    uiPrimitiveDefinitions[primitiveName as keyof typeof uiPrimitiveDefinitions];
  const leaves = flattenStyleLeaves(primitiveDefinition)
    .filter((leaf) => leaf.path.length > 0)
    .sort((left, right) => left.path.localeCompare(right.path));

  return (
    <Table>
      <TableCaption>{`Flattened authored declarations for ${primitiveName}.`}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Property Path</TableHead>
          <TableHead scope="col">Preview</TableHead>
          <TableHead scope="col">Value</TableHead>
          <TableHead scope="col">Kind</TableHead>
          <TableHead scope="col">Repetition</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaves.map((leaf) => {
          const path = `uiPrimitives.${primitiveName}.${leaf.path}`;
          const duplicateCount = duplicateCountByPath.get(path) ?? 0;

          return (
            <TableRow key={path}>
              <TableCell>
                <Typography as="code" variant="code">
                  {leaf.path}
                </Typography>
              </TableCell>
              <TableCell>
                <ValuePreview keyName={leaf.path} value={leaf.value} />
              </TableCell>
              <TableCell>
                <ValueCode value={leaf.value} />
              </TableCell>
              <TableCell>
                <ValueKindBadge kind={getValueKind(leaf.path, leaf.value)} />
              </TableCell>
              <TableCell>
                <RepeatBadge count={duplicateCount} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function PrimitivesPanel(props: { duplicateCountByPath: Map<string, number> }) {
  const { duplicateCountByPath } = props;
  const primitiveNames = Object.keys(uiPrimitiveDefinitions).sort((left, right) =>
    left.localeCompare(right)
  );

  return (
    <>
      <CardHeader>
        <CardTitle>Style Primitives</CardTitle>
        <CardDescription>
          Authored `uiPrimitiveDefinitions` flattened into inspectable rows before StyleX compiles
          them into class names.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={primitiveNames}>
          {primitiveNames.map((primitiveName) => (
            <AccordionItem key={primitiveName} value={primitiveName}>
              <AccordionTrigger>{primitiveName}</AccordionTrigger>
              <AccordionContent>
                <PrimitiveRows
                  duplicateCountByPath={duplicateCountByPath}
                  primitiveName={primitiveName}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </>
  );
}

function DesignSystemOverviewPage() {
  const tokenOccurrences = getTokenOccurrences(tokenGroups);
  const primitiveOccurrences = getPrimitiveOccurrences();
  const allOccurrences = [...tokenOccurrences, ...primitiveOccurrences];
  const duplicateClusters = getDuplicateClusters(allOccurrences);
  const duplicateCountByPath = getDuplicateCountByPath(duplicateClusters);
  const uniqueValueCount = new Set(
    allOccurrences.map((occurrence) => formatTokenValue(occurrence.value))
  ).size;
  const duplicateReferenceCount = duplicateClusters.reduce(
    (total, cluster) => total + cluster.occurrences.length - 1,
    0
  );

  return (
    <>
      <InventorySnapshotCard
        duplicateClusters={duplicateClusters}
        duplicateReferenceCount={duplicateReferenceCount}
        primitiveOccurrences={primitiveOccurrences}
        tokenOccurrences={tokenOccurrences}
        uniqueValueCount={uniqueValueCount}
      />

      <Separator decorative />

      <Tabs defaultValue="catalog">
        <TabsList>
          <TabsTrigger value="catalog">Token Catalog</TabsTrigger>
          <TabsTrigger value="repeats">Repeated Values</TabsTrigger>
          <TabsTrigger value="primitives">Style Primitives</TabsTrigger>
        </TabsList>

        <TabsPanel value="catalog">
          <TokenCatalogPanel duplicateCountByPath={duplicateCountByPath} groups={tokenGroups} />
        </TabsPanel>

        <TabsPanel value="repeats">
          <RepeatsPanel duplicateClusters={duplicateClusters} />
        </TabsPanel>

        <TabsPanel value="primitives">
          <PrimitivesPanel duplicateCountByPath={duplicateCountByPath} />
        </TabsPanel>
      </Tabs>
    </>
  );
}

const releaseRows = [
  {
    id: 'rel-218',
    owner: 'Platform',
    risk: 'Low',
    status: 'Ready',
    window: 'Mar 10'
  },
  {
    id: 'rel-219',
    owner: 'Billing',
    risk: 'Medium',
    status: 'Review',
    window: 'Mar 12'
  },
  {
    id: 'rel-220',
    owner: 'Growth',
    risk: 'High',
    status: 'Blocked',
    window: 'Mar 13'
  }
] as const;

const teamMembers = [
  {
    initials: 'AL',
    name: 'Ari Li',
    role: 'Frontend',
    status: 'On track'
  },
  {
    initials: 'JC',
    name: 'June Cho',
    role: 'Backend',
    status: 'Needs review'
  },
  {
    initials: 'MN',
    name: 'Mina Ng',
    role: 'Design',
    status: 'On track'
  }
] as const;

function getRiskBadgeVariant(risk: string): 'success' | 'warning' | 'error' {
  if (risk === 'Low') {
    return 'success';
  }

  if (risk === 'Medium') {
    return 'warning';
  }

  return 'error';
}

function getStatusBadgeVariant(status: string): 'neutral' | 'warning' | 'error' {
  if (status === 'Ready') {
    return 'neutral';
  }

  if (status === 'Review') {
    return 'warning';
  }

  return 'error';
}

function getMemberStatusBadgeVariant(status: string): 'success' | 'warning' {
  return status === 'On track' ? 'success' : 'warning';
}

function ComponentSamplePage() {
  return (
    <Flex as="main" direction="column" gap="xl" padding="xl">
      <Flex as="header" direction="column" gap="md">
        <Breadcrumb aria-label="Workspace path">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/releases">Releases</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Command Center</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Flex align="start" justify="between" wrap="wrap" gap="md">
          <Flex direction="column" gap="xs">
            <Typography as="h1" variant="h2">
              Release Command Center
            </Typography>
            <Typography variant="muted">
              A realistic page preview composed entirely from library components.
            </Typography>
          </Flex>

          <Flex gap="sm" wrap="wrap">
            <Button variant="secondary">Preview Build</Button>
            <Button>Publish Release</Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex as="section" wrap="wrap" gap="lg">
        <Card style={{ flex: '1 1 220px' }}>
          <CardHeader>
            <CardTitle>Release Progress</CardTitle>
            <CardDescription>Current sprint rollout completion.</CardDescription>
          </CardHeader>
          <CardContent>
            <Flex direction="column" gap="xs">
              <Flex align="center" justify="between">
                <Typography variant="small">Progress</Typography>
                <Typography variant="small">72%</Typography>
              </Flex>
              <Progress aria-label="Release completion" value={72} />
            </Flex>
          </CardContent>
        </Card>

        <Card style={{ flex: '1 1 220px' }}>
          <CardHeader>
            <CardTitle>Open Incidents</CardTitle>
            <CardDescription>Issues linked to this train.</CardDescription>
          </CardHeader>
          <CardContent>
            <Flex align="center" justify="between">
              <Typography as="p" variant="h3">
                4
              </Typography>
              <Badge variant="warning">Attention</Badge>
            </Flex>
          </CardContent>
        </Card>

        <Card style={{ flex: '1 1 220px' }}>
          <CardHeader>
            <CardTitle>Deploy Health</CardTitle>
            <CardDescription>Past 24h deployment checks.</CardDescription>
          </CardHeader>
          <CardContent>
            <Flex align="center" justify="between">
              <Typography as="p" variant="h3">
                99.3%
              </Typography>
              <Badge variant="success">Stable</Badge>
            </Flex>
          </CardContent>
        </Card>
      </Flex>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsPanel value="overview">
          <Flex wrap="wrap" gap="lg">
            <Card style={{ flex: '2 1 460px' }}>
              <CardHeader>
                <CardTitle>Upcoming Windows</CardTitle>
                <CardDescription>Release windows and readiness status.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>The next deployment windows for active trains.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead scope="col">Release</TableHead>
                      <TableHead scope="col">Owner</TableHead>
                      <TableHead scope="col">Risk</TableHead>
                      <TableHead scope="col">Status</TableHead>
                      <TableHead scope="col">Window</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {releaseRows.map((release) => (
                      <TableRow key={release.id}>
                        <TableCell>
                          <Typography as="code" variant="code">
                            {release.id}
                          </Typography>
                        </TableCell>
                        <TableCell>{release.owner}</TableCell>
                        <TableCell>
                          <Badge variant={getRiskBadgeVariant(release.risk)}>{release.risk}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(release.status)}>
                            {release.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{release.window}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card style={{ flex: '1 1 280px' }}>
              <CardHeader>
                <CardTitle>Checklist</CardTitle>
                <CardDescription>Gate review before final publish.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <Flex as="li" direction="column" gap="sm">
                    <Typography>QA regression passed in staging.</Typography>
                    <Typography>Accessibility spot checks completed.</Typography>
                    <Typography>Rollback plan approved by on-call.</Typography>
                  </Flex>
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost">
                  Open runbook
                </Button>
              </CardFooter>
            </Card>
          </Flex>
        </TabsPanel>

        <TabsPanel value="team">
          <Card>
            <CardHeader>
              <CardTitle>Release Team</CardTitle>
              <CardDescription>Owners assigned to this deployment cycle.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Member</TableHead>
                    <TableHead scope="col">Role</TableHead>
                    <TableHead scope="col">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.name}>
                      <TableCell>
                        <Flex align="center" gap="sm">
                          <Avatar alt={member.name} size="sm">
                            {member.initials}
                          </Avatar>
                          <Typography>{member.name}</Typography>
                        </Flex>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Badge variant={getMemberStatusBadgeVariant(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsPanel>

        <TabsPanel value="settings">
          <Flex wrap="wrap" gap="lg">
            <Card style={{ flex: '2 1 420px' }}>
              <CardHeader>
                <CardTitle>Notification Defaults</CardTitle>
                <CardDescription>Configure rollout alerts for this workspace.</CardDescription>
              </CardHeader>
              <CardContent>
                <Flex direction="column" gap="md">
                  <FormField>
                    <FormFieldLabel>Primary channel</FormFieldLabel>
                    <FormFieldControl>
                      <Select defaultValue="slack">
                        <option value="slack">Slack</option>
                        <option value="email">Email</option>
                        <option value="pagerduty">PagerDuty</option>
                      </Select>
                    </FormFieldControl>
                    <FormFieldDescription>
                      Incident and rollout alerts are sent here.
                    </FormFieldDescription>
                  </FormField>

                  <FormField>
                    <FormFieldLabel>Escalation contact</FormFieldLabel>
                    <FormFieldControl>
                      <Input defaultValue="oncall@company.com" />
                    </FormFieldControl>
                    <FormFieldDescription>
                      Used when deployment health drops below threshold.
                    </FormFieldDescription>
                  </FormField>
                </Flex>
              </CardContent>
              <CardFooter>
                <Button variant="secondary">Cancel</Button>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>

            <Card style={{ flex: '1 1 280px' }}>
              <CardHeader>
                <CardTitle>Policy Notice</CardTitle>
                <CardDescription>Current enforcement state for production pushes.</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="info">
                  <AlertTitle>Approval required</AlertTitle>
                  <AlertDescription>
                    At least one reviewer from Platform must approve a high-risk release.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </Flex>
        </TabsPanel>
      </Tabs>
    </Flex>
  );
}

const meta = {
  title: 'Foundations/Design System Overview',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <DesignSystemOverviewPage />
};

export const ComponentPage: Story = {
  render: () => <ComponentSamplePage />
};
