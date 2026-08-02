import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { URLs } from '../../constant/url';

test.describe('Login', () => {
  test('valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(`${URLs.BASE_URL}inventory.html`);
  })

  test('invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');
    await expect(loginPage.errorMessage).toBeVisible();
  })

  test('empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
  })

  test('empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMessage).toBeVisible();
  })
});
