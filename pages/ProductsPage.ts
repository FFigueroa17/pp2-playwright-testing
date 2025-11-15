import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for the Products page.
 * Provides methods and locators for interacting with the products page elements.
 */
export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;

  /**
   * Initializes a new instance of the ProductsPage.
   * @param page - The Playwright Page object to interact with.
   */
  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".product_label");
  }

  /**
   * Verifies that the user is on the products page by waiting for the product label to be visible.
   */
  async verifyIsOnProductsPage() {
    await this.title.waitFor();
  }
}
