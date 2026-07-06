import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { URLs } from '../../constant/url';

test.describe('Login', () => {
  test('valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(`${URLs.BASE_URL}/inventory.html`);
  }
)});
