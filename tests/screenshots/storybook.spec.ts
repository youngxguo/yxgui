import { expect, test, type Page } from '@playwright/test';

type Story = {
  id: string;
  name: string;
  title: string;
  type: string;
};

type StorybookIndex = {
  entries: Record<string, Story>;
};

const themes = ['light', 'dark'] as const;

async function waitForInter(page: Page) {
  const loadedFaces = await page.evaluate(async () => {
    const faces = await document.fonts.load('400 16px "Inter Variable"', 'Inter');
    await document.fonts.ready;

    return faces.filter((face) => face.status === 'loaded').length;
  });

  expect(loadedFaces).toBeGreaterThan(0);
}

async function waitForImages(page: Page) {
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0)
  );
}

for (const theme of themes) {
  test(`all stories match the ${theme} theme snapshots`, async ({ page, request }) => {
    const indexResponse = await request.get('/index.json');
    expect(indexResponse.ok()).toBeTruthy();

    const index = (await indexResponse.json()) as StorybookIndex;
    const stories = Object.values(index.entries)
      .filter((entry) => entry.type === 'story')
      .sort((left, right) => left.id.localeCompare(right.id));

    expect(stories.length).toBeGreaterThan(0);

    for (const story of stories) {
      const query = new URLSearchParams({
        id: story.id,
        viewMode: 'story',
        globals: `theme:${theme}`
      });

      await page.goto(`/iframe.html?${query.toString()}`);
      await expect(page.locator('#storybook-root > *')).toBeVisible();
      await waitForInter(page);
      await waitForImages(page);

      await expect
        .soft(page, `${story.title} / ${story.name}`)
        .toHaveScreenshot(`${story.id}-${theme}.png`, { fullPage: true });
    }
  });
}

test('switch supports pointer and keyboard interaction', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-switch--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const control = page.getByRole('switch', { name: 'Email notifications' });

  await expect(control).toHaveAttribute('aria-checked', 'false');
  await control.click();
  await expect(control).toHaveAttribute('aria-checked', 'true');
  await control.press('Space');
  await expect(control).toHaveAttribute('aria-checked', 'false');
});

test('toggle supports pointer and keyboard interaction', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-toggle--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const control = page.getByRole('button', { name: 'Bold' });

  await expect(control).toHaveAttribute('aria-pressed', 'false');
  await control.click();
  await expect(control).toHaveAttribute('aria-pressed', 'true');
  await control.press('Space');
  await expect(control).toHaveAttribute('aria-pressed', 'false');
});

test('collapsible uses native disclosure interaction', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-collapsible--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const details = page.locator('details');
  const trigger = page.getByText('Advanced settings');

  await expect(details).not.toHaveAttribute('open', '');
  await trigger.click();
  await expect(details).toHaveAttribute('open', '');
  await trigger.press('Enter');
  await expect(details).not.toHaveAttribute('open', '');
});

test('slider supports keyboard value changes', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-slider--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const slider = page.getByRole('slider', { name: 'Volume' });
  await expect(slider).toHaveAttribute('aria-valuenow', '40');
  await slider.press('ArrowRight');
  await expect(slider).toHaveAttribute('aria-valuenow', '41');
});

test('number field supports stepper interaction', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-numberfield--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByRole('textbox', { name: 'Seats' });
  await expect(input).toHaveValue('2');
  await page.getByRole('button', { name: 'Increase' }).click();
  await expect(input).toHaveValue('3');
});

test('search field clears its native value and restores input focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-searchfield--filled',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByRole('searchbox', { name: 'Search components' });
  await expect(input).toHaveValue('dialog');
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
});

test('password field toggles visibility without losing its value', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-passwordfield--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByLabel('Password', { exact: true });
  await input.fill('correct horse');
  await expect(input).toHaveAttribute('type', 'password');
  await page.getByRole('button', { name: 'Show password' }).click();
  await expect(input).toHaveAttribute('type', 'text');
  await expect(input).toHaveValue('correct horse');
});

test('color field synchronizes text entry with the native picker', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-colorfield--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const text = page.getByRole('textbox', { name: 'Brand color' });
  const picker = page.getByLabel('Choose color');
  await text.fill('#ff0000');
  await expect(picker).toHaveValue('#ff0000');
  await picker.fill('#00ff00');
  await expect(text).toHaveValue('#00ff00');
});

test('stepper reports and changes the current workflow step', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-stepper--interactive',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const review = page.getByRole('button', { name: 'Review' }).locator('..').locator('..');
  const publishButton = page.getByRole('button', { name: 'Publish' });
  const publish = publishButton.locator('..').locator('..');

  await expect(review).toHaveAttribute('aria-current', 'step');
  await publishButton.click();
  await expect(publish).toHaveAttribute('aria-current', 'step');
});

test('copy button writes to the clipboard and reports success', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const query = new URLSearchParams({
    id: 'components-copybutton--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  await page.getByRole('button', { name: 'Copy' }).click();
  await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe('pnpm add yxgui');
});

test('rating uses native radio-group keyboard interaction', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-rating--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const third = page.getByRole('radio', { name: '3 stars' });
  const fourth = page.getByRole('radio', { name: '4 stars' });
  await expect(third).toBeChecked();
  await third.focus();
  await third.press('ArrowRight');
  await expect(fourth).toBeChecked();
});

test('listbox uses native keyboard selection', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-listbox--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const listbox = page.getByRole('listbox', { name: 'Components' });
  await expect(listbox).toHaveValue('alert');
  await listbox.focus();
  await listbox.press('ArrowDown');
  await expect(listbox).toHaveValue('button');
});

test('segmented control uses native radio keyboard selection', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-segmentedcontrol--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const list = page.getByRole('radio', { name: 'List' });
  const board = page.getByRole('radio', { name: 'Board' });
  await expect(list).toBeChecked();
  await list.focus();
  await list.press('ArrowRight');
  await expect(board).toBeChecked();
});

test('calendar supports grid keyboard navigation and selection', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-calendar--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const selected = page.getByRole('button', { name: 'Sunday, August 16, 2026' });
  const next = page.getByRole('button', { name: 'Monday, August 17, 2026' });
  await selected.focus();
  await selected.press('ArrowRight');
  await expect(next).toBeFocused();
  await next.press('Enter');
  await expect(next.locator('..')).toHaveAttribute('aria-selected', 'true');
  await next.press('PageDown');
  await expect(page.getByRole('grid', { name: 'September 2026' })).toBeVisible();
});

test('date picker selects a date, closes, and restores trigger focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-datepicker--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: /Release date Aug 16, 2026/ });
  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Release date calendar' })).toBeVisible();
  await page.getByRole('button', { name: 'Monday, August 17, 2026' }).click();
  await expect(page.getByRole('dialog', { name: 'Release date calendar' })).toBeHidden();
  const updatedTrigger = page.getByRole('button', { name: /Release date Aug 17, 2026/ });
  await expect(updatedTrigger).toBeFocused();
});

test('autocomplete filters and completes free-form input', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-autocomplete--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByRole('combobox', { name: 'Component search' });
  await input.fill('auto');
  await expect(page.getByRole('option', { name: 'Autocomplete' })).toBeVisible();
  await expect(page.getByRole('option', { name: 'Accordion' })).toBeHidden();
  await input.press('Enter');
  await expect(input).toHaveValue('Autocomplete');
  await input.fill('Custom component');
  await expect(input).toHaveValue('Custom component');
});

test('form connects server errors to named fields', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-form--server-error',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByRole('textbox', { name: 'Email' });
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('alert')).toHaveText('That email address is already registered.');
  await expect(input).toHaveAttribute('aria-describedby');
});

test('combobox filters and selects with the keyboard', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-combobox--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByRole('combobox', { name: 'Favorite fruit' });
  await input.fill('blu');
  await expect(page.getByRole('option', { name: 'Blueberry' })).toBeVisible();
  await expect(page.getByRole('option', { name: 'Apple' })).toBeHidden();
  await input.press('ArrowDown');
  await input.press('Enter');
  await expect(input).toHaveValue('Blueberry');
});

test('multi-select adds and removes values with keyboard and pointer input', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-multiselect--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByRole('combobox', { name: 'Technologies' });
  await expect(page.getByRole('button', { name: 'Remove React' })).toBeVisible();
  await page.getByRole('button', { name: 'Remove React' }).click();
  await expect(page.getByRole('button', { name: 'Remove React' })).toBeHidden();
  await input.fill('style');
  await expect(page.getByRole('option', { name: 'StyleX' })).toBeVisible();
  await input.press('ArrowDown');
  await input.press('Enter');
  await expect(page.getByRole('button', { name: 'Remove StyleX' })).toBeVisible();
});

test('tag input creates and removes free-form values', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-taginput--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByRole('textbox', { name: 'Tags' });
  await input.fill('native');
  await input.press('Enter');
  await expect(page.getByRole('button', { name: 'Remove native' })).toBeVisible();
  await page.getByRole('button', { name: 'Remove native' }).click();
  await expect(page.getByRole('button', { name: 'Remove native' })).toBeHidden();
});

test('command menu filters, selects, and restores focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-commandmenu--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: 'Open commands' });
  await trigger.click();
  const input = page.getByRole('combobox', { name: 'Search commands' });
  await expect(input).toBeFocused();
  await input.fill('theme');
  await expect(page.getByRole('option', { name: /Switch theme/ })).toBeVisible();
  await expect(page.getByRole('option', { name: /New file/ })).toBeHidden();
  await input.press('Enter');
  await expect(page.getByText('Switch theme', { exact: true })).toBeVisible();
  await expect(trigger).toBeFocused();
});

test('date field preserves native keyboard-editable values', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-datetimefield--date',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByLabel('Start date');
  await expect(input).toHaveAttribute('type', 'date');
  await expect(input).toHaveValue('2026-08-16');
  await input.fill('2026-08-20');
  await expect(input).toHaveValue('2026-08-20');
});

test('file upload reports and clears native file selections', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-fileupload--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const input = page.getByLabel('Attachments');
  await input.setInputFiles({
    name: 'avatar.png',
    mimeType: 'image/png',
    buffer: Buffer.from('image')
  });
  await expect(page.getByText('avatar.png')).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page.getByText('avatar.png')).toBeHidden();
  expect(await input.evaluate((node: HTMLInputElement) => node.files?.length)).toBe(0);
});

test('tree view supports branch and selection keyboard navigation', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-treeview--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const components = page.getByRole('treeitem', { name: 'Components' });
  await components.focus();
  await components.press('ArrowRight');
  await expect(page.getByRole('treeitem', { name: 'Button' })).toBeFocused();
  await page.getByRole('treeitem', { name: 'Button' }).press('ArrowDown');
  const select = page.getByRole('treeitem', { name: 'Select' });
  await expect(select).toBeFocused();
  await select.press('Enter');
  await expect(select).toHaveAttribute('aria-selected', 'true');
  await select.press('ArrowLeft');
  await expect(components).toBeFocused();
});

test('data table sorts native rows and exposes sort direction', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-datatable--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const header = page.getByRole('columnheader', { name: /Workspace/ });
  await header.getByRole('button').click();
  await expect(header).toHaveAttribute('aria-sort', 'ascending');
  await expect(page.getByRole('row').nth(1)).toContainText('Operations');
  await header.getByRole('button').click();
  await expect(header).toHaveAttribute('aria-sort', 'descending');
  await expect(page.getByRole('row').nth(1)).toContainText('Research');
});

test('resizable panels support keyboard and pointer resizing', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-resizablepanels--horizontal',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const handle = page.getByRole('separator', { name: 'Resize panels' });
  await expect(handle).toHaveAttribute('aria-valuenow', '40');
  await handle.press('ArrowRight');
  await expect(handle).toHaveAttribute('aria-valuenow', '45');

  const bounds = await handle.boundingBox();
  if (!bounds) throw new Error('Resize handle has no bounds.');
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + 80, bounds.y + bounds.height / 2);
  await page.mouse.up();
  await expect(handle).not.toHaveAttribute('aria-valuenow', '45');
});

test('OTP field filters invalid text and advances between slots', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-otpfield--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const inputs = page.getByRole('textbox');
  await page.getByRole('textbox', { name: 'Verification code' }).focus();
  await page.keyboard.type('12a3456');
  await expect(inputs).toHaveCount(6);
  await expect(inputs.nth(0)).toHaveValue('1');
  await expect(inputs.nth(1)).toHaveValue('2');
  await expect(inputs.nth(2)).toHaveValue('3');
  await expect(inputs.nth(3)).toHaveValue('4');
  await expect(inputs.nth(4)).toHaveValue('5');
  await expect(inputs.nth(5)).toHaveValue('6');
});

test('tabs support arrow-key activation', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-tabs--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const overview = page.getByRole('tab', { name: 'Overview' });
  await overview.focus();
  await overview.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Projects' })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await expect(page.getByRole('tabpanel')).toContainText('active projects');
});

test('accordion supports disclosure interaction', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-accordion--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: 'How do I get started?' });
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Does it support dark mode?' }).click();
  await expect(page.getByText(/Theme owns both light and dark/)).toBeVisible();
});

test('toolbar supports roving keyboard focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-toolbar--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const undo = page.getByRole('button', { name: 'Undo' });
  const redo = page.getByRole('button', { name: 'Redo' });
  await undo.focus();
  await undo.press('ArrowRight');
  await expect(redo).toBeFocused();
});

test('navigation menu supports roving focus and Escape dismissal', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-navigationmenu--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const products = page.getByRole('button', { name: 'Products' });
  const resources = page.getByRole('button', { name: 'Resources' });
  await products.focus();
  await products.press('ArrowRight');
  await expect(resources).toBeFocused();
  await products.click();
  await expect(page.getByRole('link', { name: 'Components' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('link', { name: 'Components' })).toBeHidden();
  await expect(products).toBeFocused();
});

test('dialog traps focus, dismisses with Escape, and restores focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-dialog--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: 'Edit profile' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Edit profile' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Name' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('drawer traps focus, dismisses with Escape, and restores focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-drawer--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: 'Open workspace drawer' });
  await trigger.click();
  const drawer = page.getByRole('dialog', { name: 'Workspace settings' });
  await expect(drawer).toBeVisible();
  await expect(drawer).toBeFocused();
  await drawer.press('Tab');
  await expect(page.getByRole('textbox', { name: 'Workspace name' })).toBeFocused();
  await expect(drawer).toHaveAttribute('data-swipe-direction', 'right');
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('alert dialog requires a visible response and restores focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-alertdialog--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: 'Delete project' });
  await trigger.click();
  const dialog = page.getByRole('alertdialog', { name: 'Delete project?' });
  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('popover dismisses with Escape and restores focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-popover--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: 'Workspace details' });
  await trigger.click();
  const popover = page.getByRole('dialog', { name: 'Personal workspace' });
  await expect(popover).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(popover).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('preview card opens from focus and dismisses with Escape', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-previewcard--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('link', { name: 'visual systems' });
  await trigger.focus();
  await expect(page.getByText('A shared language for color')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByText('A shared language for color')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('tooltip opens on focus and dismisses with Escape', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-tooltip--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: 'Save changes' });
  await trigger.focus();
  const tooltip = page.getByRole('tooltip');
  await expect(tooltip).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(tooltip).toBeHidden();
});

test('menu supports arrow-key selection and restores focus', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-menu--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const trigger = page.getByRole('button', { name: 'View options' });
  await trigger.focus();
  await trigger.press('ArrowDown');
  const firstItem = page.getByRole('menuitemradio', { name: 'Date' });
  await expect(firstItem).toBeFocused();
  await firstItem.press('ArrowDown');
  const nextItem = page.getByRole('menuitemradio', { name: 'Name' });
  await expect(nextItem).toBeFocused();
  await nextItem.press('Enter');
  await expect(nextItem).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('menubar supports roving focus and opens a menu', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-menubar--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const file = page.getByRole('menuitem', { name: 'File' });
  const edit = page.getByRole('menuitem', { name: 'Edit' });
  await file.focus();
  await file.press('ArrowRight');
  await expect(edit).toBeFocused();
  await file.click();
  await expect(page.getByRole('menuitem', { name: 'New document' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(file).toBeFocused();
});

test('context menu opens from right click and dismisses with Escape', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-contextmenu--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  await page.getByText('Right click for project actions').click({ button: 'right' });
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Open' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
});

test('scroll area provides a native scrolling viewport', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-scrollarea--vertical',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const root = page.getByLabel('Recent activity');
  const viewport = root.locator(':scope > div').first();

  await expect(viewport).toBeVisible();
  expect(await viewport.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(
    true
  );
  await viewport.evaluate((element) => {
    element.scrollTop = 48;
  });
  await expect.poll(() => viewport.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
});

test('carousel supports controls and keyboard navigation', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-carousel--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  const viewport = page.getByRole('group', { name: 'Library tour slides' });
  await expect(page.getByText('1 of 3')).toBeVisible();
  await page.getByRole('button', { name: 'Next slide' }).click();
  await expect(page.getByText('2 of 3')).toBeVisible();
  await viewport.focus();
  await viewport.press('End');
  await expect(page.getByText('3 of 3')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next slide' })).toBeDisabled();
});

test('toast announces feedback and supports actions and dismissal', async ({ page }) => {
  const query = new URLSearchParams({
    id: 'components-toast--default',
    viewMode: 'story',
    globals: 'theme:light'
  });

  await page.goto(`/iframe.html?${query.toString()}`);
  await page.getByRole('button', { name: 'Show notification' }).click();
  await expect(page.getByText('Project saved')).toBeVisible();
  await expect(page.getByText('Your changes are available across devices.')).toBeVisible();
  await page.keyboard.press('F6');
  await expect(page.getByRole('region', { name: 'Notifications' })).toBeFocused();
  await page.getByRole('button', { name: 'Dismiss notification' }).click();
  await expect(page.getByText('Project saved')).toBeHidden();
});
