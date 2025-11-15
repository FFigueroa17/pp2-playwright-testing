import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for the Login page.
 * Provides methods and locators for interacting with the login page elements.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  /**
   * Initializes a new instance of the LoginPage.
   * @param page - The Playwright Page object to interact with.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  /**
   * Navigates to the login page.
   */
  async goto() {
    await this.page.goto("https://www.saucedemo.com/v1/index.html");
  }

  /**
   * Performs a login action with the provided credentials.
   * @param username - The username to use for login.
   * @param password - The password to use for login.
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Gets the error message displayed on the login page.
   * @returns The error message text, or null if no error is displayed.
   */
  async getErrorMessage(): Promise<string | null> {
    const errorContainer = this.page.locator('[data-test="error"]');
    const isVisible = await errorContainer.isVisible().catch(() => false);
    if (!isVisible) return null;
    return await errorContainer.textContent();
  }

  /**
   * Verifies that an error message is displayed.
   * @param expectedMessage - The expected error message text (optional).
   */
  async verifyErrorMessage(expectedMessage?: string) {
    const errorContainer = this.page.locator('[data-test="error"]');
    await expect(errorContainer).toBeVisible();
    if (expectedMessage) {
      await expect(errorContainer).toContainText(expectedMessage);
    }
  }
}
