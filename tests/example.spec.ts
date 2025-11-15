import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

/**
 * Test suite demonstrating Playwright capabilities with SauceDemo.
 * Tests cover login and product interactions.
 */

test.describe("Login Tests", () => {
  test("Successful login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await productsPage.verifyIsOnProductsPage();
    await expect(productsPage.title).toHaveText("Products");
  });

  test("Login with locked out user shows error", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.verifyErrorMessage();
  });
});

test.describe("Product Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Verify products page loads", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.verifyIsOnProductsPage();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test("Add product to cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.verifyIsOnProductsPage();
    await productsPage.addProductToCart("Sauce Labs Backpack");

    // Verify button changed to "Remove"
    const product = productsPage.productItems.filter({
      hasText: "Sauce Labs Backpack",
    });
    const removeButton = product
      .locator("button")
      .filter({ hasText: "Remove" });
    await expect(removeButton).toBeVisible();
  });
});
