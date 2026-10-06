import { test, expect } from '@playwright/test';

test.describe('Skills page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/skills');
  });

  test('shows the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/skills/i);
  });

  test('"skills" nav link is active', async ({ page }) => {
    const activeLink = page.locator('.nav-page-link.active');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute('href', '/skills');
  });

  test('lists the Prompt Fixer plugin', async ({ page }) => {
    await expect(page.locator('.skill-name')).toContainText('Prompt Fixer');
  });

  test('links to the Prompt Fixer source on GitHub', async ({ page }) => {
    await expect(
      page.locator('a.skill-link[href="https://github.com/chatquill/prompt-fixer"]'),
    ).toBeVisible();
  });
});
