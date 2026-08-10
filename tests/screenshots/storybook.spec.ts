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

      await expect
        .soft(page, `${story.title} / ${story.name}`)
        .toHaveScreenshot(`${story.id}-${theme}.png`, { fullPage: true });
    }
  });
}
