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
