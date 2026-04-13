import { expect, test } from "@playwright/test";

test.describe("public scaffold routes", () => {
  test("redirects unauthenticated visitors to login", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("link", { name: "TinyNotes" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Login", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Register", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("renders the login scaffold with shared auth shell and disabled controls", async ({
    page,
  }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Public entry-point scaffold" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeDisabled();
    await expect(page.getByLabel("Password")).toBeDisabled();
    await expect(page.getByRole("button", { name: "Login" })).toBeDisabled();
    await expect(page.getByRole("link", { name: "Open the register page" })).toBeVisible();
  });

  test("renders the register scaffold with shared auth shell and disabled controls", async ({
    page,
  }) => {
    await page.goto("/register");

    await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Public entry-point scaffold" })).toBeVisible();
    await expect(page.getByLabel("Name")).toBeDisabled();
    await expect(page.getByLabel("Email")).toBeDisabled();
    await expect(page.getByLabel("Password")).toBeDisabled();
    await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    await expect(page.getByRole("link", { name: "Open the login page" })).toBeVisible();
  });
});
