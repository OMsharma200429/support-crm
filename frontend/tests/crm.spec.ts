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
      page.getByRole('link', {
        name: 'Overview',
        exact: true,
      })
    ).toBeVisible();

    await expect(
      page.getByRole('link', {
        name: 'Tickets',
        exact: true,
      })
    ).toBeVisible();

    await expect(
      page.getByRole('link', {
        name: 'Customers',
        exact: true,
      })
    ).toBeVisible();

    await expect(
      page.getByRole('link', {
        name: 'Analytics',
        exact: true,
      })
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
      page.getByText('Tickets', {
        exact: true,
      }).first()
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
      page.getByText('Customers', {
        exact: true,
      }).first()
    ).toBeVisible();
  });

  test('New ticket button is visible', async ({ page }) => {
    const newTicketButton = page
      .getByRole('button', {
        name: /new ticket/i,
      })
      .first();

    await expect(newTicketButton).toBeVisible();
  });

  test('Search box is available', async ({ page }) => {
    const searchTrigger = page
      .getByRole('button')
      .filter({
        hasText: /search tickets, customers, commands/i,
      })
      .first();

    await expect(searchTrigger).toBeVisible();
  });

  test('New ticket modal opens correctly', async ({ page }) => {
    const newTicketButton = page
      .getByRole('button', {
        name: /new ticket/i,
      })
      .first();

    await expect(newTicketButton).toBeVisible();

    await newTicketButton.click();

    const modal = page.locator('.modal-panel');

    await expect(modal).toBeVisible();

    await expect(
      modal
        .getByRole('paragraph')
        .filter({
          hasText: /^Create ticket$/,
        })
    ).toBeVisible();

    await expect(
      modal.getByText('New support case', {
        exact: true,
      })
    ).toBeVisible();

    await expect(
      modal.getByText('Subject', {
        exact: true,
      })
    ).toBeVisible();

    await expect(
      modal
        .locator('span')
        .filter({
          hasText: /^Customer$/,
        })
    ).toBeVisible();

    await expect(
      modal.getByText('Priority', {
        exact: true,
      })
    ).toBeVisible();

    await expect(
      modal.getByText('Status', {
        exact: true,
      })
    ).toBeVisible();

    await expect(
      modal.getByText('Category', {
        exact: true,
      })
    ).toBeVisible();

    await expect(
      modal.getByPlaceholder('Issue summary')
    ).toBeVisible();

    await expect(
      modal.getByRole('button', {
        name: 'Create ticket',
        exact: true,
      })
    ).toBeVisible();
  });

  test('Create ticket form can be filled and submitted', async ({ page }) => {
    const newTicketButton = page
      .getByRole('button', {
        name: /new ticket/i,
      })
      .first();

    await expect(newTicketButton).toBeVisible();

    await newTicketButton.click();

    const modal = page.locator('.modal-panel');

    await expect(modal).toBeVisible();

    await modal
      .getByPlaceholder('Issue summary')
      .fill('Unable to access customer dashboard');

    const customerInput = modal
      .locator('label')
      .filter({
        hasText: /^Customer/,
      })
      .locator('input');

    await expect(customerInput).toBeVisible();

    await customerInput.fill('Acme Corporation');

    const prioritySelect = modal
      .locator('select')
      .nth(0);

    await prioritySelect.selectOption({
      label: 'Urgent',
    });

    const statusSelect = modal
      .locator('select')
      .nth(1);

    await statusSelect.selectOption({
      label: 'Open',
    });

    const categorySelect = modal
      .locator('select')
      .nth(2);

    await categorySelect.selectOption({
      label: 'Technical',
    });

    await expect(
      modal.getByRole('button', {
        name: 'Create ticket',
        exact: true,
      })
    ).toBeVisible();

    await modal
      .getByRole('button', {
        name: 'Create ticket',
        exact: true,
      })
      .click();

    await expect(modal).not.toBeVisible();
  });

});
