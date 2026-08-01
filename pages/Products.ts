import { Locator, Page } from '@playwright/test';


export class ProductsPage {
    readonly page : Page;
    readonly productTitle: Locator;
    readonly shoppingCartBadge: Locator;
    readonly productsTitle: Locator;
    

    constructor (page: Page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="title"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.productsTitle = page.locator('[data-test="inventory-item-name"]');
    }

    async addItemToCart(itemName: string) {
    const product = this.page
        .locator('[data-test="inventory-item-description"]')
        .filter({
            has: this.page.getByText(itemName, { exact: true })
        });

    await product
        .locator('button[data-test^="add-to-cart-"]')
        .click();
    }

    async clickCartIcon() {
        await this.shoppingCartBadge.click();
    }
}