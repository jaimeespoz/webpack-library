import { expect, test } from '@playwright/test';
import { argosScreenshot } from '@argos-ci/playwright';

const BASE_PATH = '/bundle-stats.html';

test('should load overview panel', async ({ page, browserName }) => {
  await page.goto(BASE_PATH);
  await expect(page).toHaveTitle(/^Bundle Size — .*\./);
  await argosScreenshot(page, `overview-${browserName}`, { fullPage: false });
  await expect(page.getByRole('link', { name: 'Overview', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('should load assets panel', async ({ page, browserName }) => {
  await page.goto(`${BASE_PATH}#/assets`);
  await argosScreenshot(page, `assets-${browserName}`, { fullPage: false });
  await expect(page.getByRole('link', { name: 'Assets', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('should load modules panel', async ({ page, browserName }) => {
  await page.goto(`${BASE_PATH}#/modules`);
  await argosScreenshot(page, `modules-${browserName}`, { fullPage: false });
  await expect(page.getByRole('link', { name: 'Modules', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('should load packages panel', async ({ page, browserName }) => {
  await page.goto(`${BASE_PATH}#/packages`);
  await argosScreenshot(page, `packages-${browserName}`, { fullPage: false });
  await expect(page.getByRole('link', { name: 'Packages', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});
