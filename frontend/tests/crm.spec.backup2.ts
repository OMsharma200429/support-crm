import { test, expect } from '@playwright/test';

test.describe('SupportCRM Application', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Dashboard loads correctly', async ({ page }) => {
    await expect(
      page.getByText('SupportCRM', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Overview', exact: true })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Tickets', exact: true })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Customers', exact: true })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Analytics', exact: true })
    ).toBeVisible();
  });

  test('Navigation to Tickets works', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Tickets', exact: true })
      .click();

    await expect(page).toHaveURL(/tickets/i);

    await expect(
      page.getByText('Tickets', { exact: true }).first()
    ).toBeVisible();
  });

  test('Navigation to Customers works', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Customers', exact: true })
      .click();

    await expect(page).toHaveURL(/customers/i);

    await expect(
      page.getByText('Customers', { exact: true }).first()
    ).toBeVisible();
  });

  test('Navigation to Analytics works', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Analytics', exact: true })
      .click();

    await expect(page).toHaveURL(/analytics/i);

    await expect(
      page.getByText('Analytics', { exact: true }).first()
    ).toBeVisible();
  });

  test('New ticket button opens ticket creation modal', async ({ page }) => {
    const newTicketButton = page
      .getByRole('button', { name: /new ticket/i })
      .first();

    await expect(newTicketButton).toBeVisible();
    await newTicketButton.click();

    await expect(
      page.getByPlaceholder('Issue summary')
    ).toBeVisible();
  });

  test('Global search opens correctly', async ({ page }) => {
    const searchTrigger = page.getByRole('button', {
      name: /search tickets, customers, commands/i,
    });

    await expect(searchTrigger).toBeVisible();
    await searchTrigger.click();

    await expect(
      page.getByPlaceholder('Search tickets, customers, commands')
    ).toBeVisible();
  });

  test('Tickets page has search box', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Tickets', exact: true })
      .click();

    await expect(page).toHaveURL(/tickets/i);

    await expect(
      page.getByPlaceholder('Search tickets')
    ).toBeVisible();
  });

  test('Customers page has search box', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Customers', exact: true })
      .click();

    await expect(page).toHaveURL(/customers/i);

    await expect(
      page.getByPlaceholder('Search company, customer, email')
    ).toBeVisible();
  });

});
