# PP2 Playwright Testing Workshop

This project demonstrates Playwright testing capabilities using SauceDemo as the
test application.

## Features

- **Page Object Model (POM)**: Organized page objects for Login and Products
  pages
- **Test Coverage**: Tests for login and product interactions
- **CI/CD Integration**: GitHub Actions workflow for automated testing

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Install Playwright browsers:

```bash
pnpm exec playwright install --with-deps
```

## Running Tests

Run all tests:

```bash
pnpm exec playwright test
```

Run tests in headed mode:

```bash
pnpm exec playwright test --headed
```

View test report:

```bash
pnpm exec playwright show-report
```

## Test Structure

- `pages/` - Page Object Model classes (LoginPage, ProductsPage)
- `tests/` - Test specifications
- Tests cover:
  - Login scenarios (success, error handling)
  - Product interactions (viewing products, adding to cart)
