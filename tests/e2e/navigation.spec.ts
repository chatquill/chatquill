import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('logo navigates from contact page back to homepage', async ({ page }) => {
    await page.goto('/contact');
    await page.locator('.wordmark').first().click();
    await expect(page).toHaveURL('/');
  });

  test('"articles" link navigates to the homepage', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('link', { name: /^articles$/i }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('"get in touch" link navigates to the contact page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /get in touch/i }).first().click();
    await expect(page).toHaveURL('/contact');
  });

  test('"articles" nav link is active on the homepage', async ({ page }) => {
    await page.goto('/');
    const articlesLink = page.locator('.nav-page-link.active');
    await expect(articlesLink).toBeVisible();
    await expect(articlesLink).toHaveAttribute('href', '/');
  });

  test('"articles" nav link is active on article pages', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.card a').first().getAttribute('href');
    await page.goto(href!);
    const activeLink = page.locator('.nav-page-link.active');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute('href', '/');
  });
});
