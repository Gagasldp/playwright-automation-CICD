import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/Products';
import { CheckoutPage } from '../../pages/Checkout';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Checkout', () => {
    test('Checkout with valid items', async ({ page }) => {
        const productPage = new ProductsPage(page);
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        expect(productPage.page).toBeTruthy();
        await productPage.addItemToCart('Sauce Labs Backpack');
        await productPage.addItemToCart('Sauce Labs Fleece Jacket');
        expect(await productPage.shoppingCartBadge.isVisible()).toBeTruthy();
        await productPage.clickCartIcon();
        expect(await checkoutPage.checkoutButton.isVisible()).toBeTruthy();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillShippingInformation('John', 'DOE', '12345');
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        expect(await checkoutPage.orderConfirmationMessage.isVisible()).toBeTruthy();
    });
    test('Checkout with empty cart', async ({ page }) => {
        const productPage = new ProductsPage(page);
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        expect(productPage.page).toBeTruthy();
        expect(await productPage.shoppingCartBadge.isVisible()).toBeFalsy();
        await productPage.clickCartIcon();
        expect(await checkoutPage.checkoutButton.isVisible()).toBeFalsy();
    });
});
