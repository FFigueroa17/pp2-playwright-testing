import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for the Products page.
 * Provides methods and locators for interacting with the products page elements.
 */
export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly productItems: Locator;

  /**
   * Initializes a new instance of the ProductsPage.
   * @param page - The Playwright Page object to interact with.
   */
  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".product_label");
    this.productItems = page.locator(".inventory_item");
  }

  /**
   * Verifies that the user is on the products page by waiting for the product label to be visible.
   */
  async verifyIsOnProductsPage() {
    await this.title.waitFor();
  }

  /**
   * Gets the number of products displayed on the page.
   * @returns The count of product items.
   */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  /**
   * Adds a product to the cart by its name.
   * @param productName - The name of the product to add to cart.
   */
  async addProductToCart(productName: string) {
    const product = this.productItems.filter({ hasText: productName });
    const addButton = product
      .locator("button")
      .filter({ hasText: "Add to cart" });
    await addButton.click();
  }
}
