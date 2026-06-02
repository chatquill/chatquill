import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('shows the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/contact|chatquill/i);
  });

  test('renders the navigation', async ({ page }) => {
    await expect(page.locator('nav.site-nav')).toBeVisible();
  });

  test('"get in touch" nav link is active', async ({ page }) => {
    const contactLink = page.locator('.nav-page-link.active');
    await expect(contactLink).toBeVisible();
  });

  test('shows the author name', async ({ page }) => {
    await expect(page.locator('h1.hero-name')).toBeVisible();
    await expect(page.locator('h1.hero-name')).toContainText('Mohun Shakeel Ahmad');
  });

  test('shows the footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});
