import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../constant/url';


export class LoginPage {
    readonly page : Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor (page: Page) {
        this.page = page;

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto(URLs.BASE_URL);
    }

    async inputUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async inputPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}