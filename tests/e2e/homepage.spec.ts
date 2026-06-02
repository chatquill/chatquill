import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/chatquill/i);
  });

  test('renders the site navigation', async ({ page }) => {
    await expect(page.locator('nav.site-nav')).toBeVisible();
    await expect(page.getByRole('link', { name: /articles/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /get in touch/i }).first()).toBeVisible();
  });

  test('logo links to the homepage', async ({ page }) => {
    const wordmark = page.locator('.wordmark').first();
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toHaveAttribute('href', '/');
  });

  test('shows the hero section with a featured article', async ({ page }) => {
    await expect(page.locator('h2, h1').first()).toBeVisible();
  });

  test('renders article cards in the grid', async ({ page }) => {
    const cards = page.locator('.card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('article cards link to /blog/ routes', async ({ page }) => {
    const firstCard = page.locator('.card a').first();
    const href = await firstCard.getAttribute('href');
    expect(href).toMatch(/^\/blog\//);
  });

  test('renders the topics sidebar', async ({ page }) => {
    await expect(page.locator('#topics-sidebar [data-cat="all"]')).toBeVisible();
  });

  test('shows "Recent Articles" section label', async ({ page }) => {
    await expect(page.getByText(/recent articles/i)).toBeVisible();
  });

  test('shows the footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});
