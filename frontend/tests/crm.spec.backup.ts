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
    const ticketsLink = page.getByRole('link', {
      name: 'Tickets',
      exact: true,
    });

    await expect(ticketsLink).toBeVisible();
    await ticketsLink.click();

    await expect(page).toHaveURL(/tickets/i);

    await expect(
      page.getByText('Tickets', { exact: true }).first()
    ).toBeVisible();
  });

  test('Navigation to Customers works', async ({ page }) => {
    const customersLink = page.getByRole('link', {
      name: 'Customers',
      exact: true,
    });

    await expect(customersLink).toBeVisible();
    await customersLink.click();

    await expect(page).toHaveURL(/customers/i);

    await expect(
      page.getByText('Customers', { exact: true }).first()
    ).toBeVisible();
  });

  test('New ticket button is visible', async ({ page }) => {
    const newTicketButton = page
      .getByRole('button', { name: /new ticket/i })
      .first();

    await expect(newTicketButton).toBeVisible();
  });

  test('Global search opens correctly', async ({ page }) => {
    const searchTrigger = page.getByRole('button', {
      name: /search tickets, customers, commands/i,
    });

    await expect(searchTrigger).toBeVisible();

    await searchTrigger.click();

    const searchInput = page.getByPlaceholder(
      'Search tickets, customers, commands'
    );

    await expect(searchInput).toBeVisible();
  });

});
