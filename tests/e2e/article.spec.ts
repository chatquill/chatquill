import { test, expect } from '@playwright/test';

test.describe('Article page', () => {
  test('clicking an article card navigates to the article', async ({ page }) => {
    await page.goto('/');
    const firstCardLink = page.locator('.card a').first();
    const href = await firstCardLink.getAttribute('href');
    await firstCardLink.click();
    await expect(page).toHaveURL(href!);
  });

  test('article page shows the navigation', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.card a').first().getAttribute('href');
    await page.goto(href!);
    await expect(page.locator('nav.site-nav')).toBeVisible();
  });

  test('article page shows a title', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.card a').first().getAttribute('href');
    await page.goto(href!);
    await expect(page.locator('main h1').first()).toBeVisible();
  });

  test('article page shows at least one tag badge', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.card a').first().getAttribute('href');
    await page.goto(href!);
    const tagBadge = page.locator('header span.font-mono').first();
    await expect(tagBadge).toBeVisible();
  });

  test('article page shows author info', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.card a').first().getAttribute('href');
    await page.goto(href!);
    await expect(page.getByText(/Mohun Shakeel Ahmad/).first()).toBeVisible();
  });

  test('article page shows the footer', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.card a').first().getAttribute('href');
    await page.goto(href!);
    await expect(page.locator('footer')).toBeVisible();
  });

  test('article page has a back link in the footer', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.card a').first().getAttribute('href');
    await page.goto(href!);
    const backLink = page.getByRole('link', { name: /back|articles/i });
    await expect(backLink).toBeVisible();
  });

  test('article body contains rendered prose', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.card a').first().getAttribute('href');
    await page.goto(href!);
    const body = page.locator('.article-body');
    await expect(body).toBeVisible();
    const text = await body.textContent();
    expect(text?.trim().length).toBeGreaterThan(100);
  });
});
