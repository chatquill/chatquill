import { test, expect } from '@playwright/test';

// Sidebar `<a>` links are the visible desktop [data-cat] elements.
// The mobile chip buttons share [data-cat] but are display:none at desktop width.
const sidebarCat = (page: import('@playwright/test').Page, cat: string) =>
  page.locator(`#topics-sidebar [data-cat="${cat}"]`);

test.describe('Category filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('"all" selector is active by default', async ({ page }) => {
    await expect(sidebarCat(page, 'all')).toHaveClass(/active/);
  });

  test('all article cards are visible on initial load', async ({ page }) => {
    const cards = page.locator('.card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }
  });

  test('clicking a category selector marks it active', async ({ page }) => {
    const aiLink = sidebarCat(page, 'AI');
    await aiLink.click();
    await expect(aiLink).toHaveClass(/active/);
  });

  test('clicking a category deactivates "all"', async ({ page }) => {
    await sidebarCat(page, 'AI').click();
    await expect(sidebarCat(page, 'all')).not.toHaveClass(/active/);
  });

  test('filtering hides cards that do not match the selected category', async ({ page }) => {
    await sidebarCat(page, 'AI').click();

    const cards = page.locator('.card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const isVisible = await card.isVisible();
      if (!isVisible) {
        const cats = await card.getAttribute('data-cats');
        expect(cats).not.toContain('AI');
      }
    }
  });

  test('clicking a category updates the URL ?cat param', async ({ page }) => {
    await sidebarCat(page, 'Tech').click();
    const url = new URL(page.url());
    expect(url.searchParams.get('cat')).toBe('Tech');
  });

  test('"all" click removes ?cat from the URL', async ({ page }) => {
    await page.goto('/?cat=AI');
    await sidebarCat(page, 'all').click();
    const url = new URL(page.url());
    expect(url.searchParams.get('cat')).toBeNull();
  });

  test('"View all →" button resets to "all" and clears ?cat', async ({ page }) => {
    await page.goto('/?cat=Tech');
    await page.locator('#view-all').click();
    const url = new URL(page.url());
    expect(url.searchParams.get('cat')).toBeNull();
    await expect(sidebarCat(page, 'all')).toHaveClass(/active/);
  });

  test('loading the page with ?cat=AI pre-selects AI', async ({ page }) => {
    await page.goto('/?cat=AI');
    await expect(sidebarCat(page, 'AI')).toHaveClass(/active/);
  });
});
