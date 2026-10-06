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

  test('article ends with two related articles', async ({ page }) => {
    await page.goto('/blog/prompt-engineering-2026');
    await expect(page.locator('section[aria-labelledby="keep-reading"] .card')).toHaveCount(2);
  });

  test('table of contents links jump to a section', async ({ page }) => {
    await page.goto('/blog/prompt-engineering-2026');
    await page.locator('.toc summary').click();
    const link = page.locator('.toc a').first();
    const target = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${target}$`));
  });

  test('code blocks get a copy button', async ({ page }) => {
    await page.goto('/blog/prompt-engineering-2026');
    await expect(page.locator('.article-body .code-copy').first()).toBeAttached();
  });

  test('unknown URLs show the not-found page', async ({ page }) => {
    const response = await page.goto('/blog/no-such-article');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/isn't here/);
  });
});
