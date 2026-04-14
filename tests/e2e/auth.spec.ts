import { expect, test } from "@playwright/test";
import { createCredentials, login, logout, register } from "./helpers/auth";

test.describe("authentication", () => {
  test("redirects unauthenticated visitors from home to login", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("registers, redirects authenticated users away from auth routes, and logs out", async ({
    page,
  }) => {
    const credentials = createCredentials("auth-register");

    await register(page, credentials);
    await expect(page.getByRole("heading", { name: "Your notes" })).toBeVisible();

    await page.goto("/login");
    await expect(page).toHaveURL(/\/notes$/);

    await page.goto("/register");
    await expect(page).toHaveURL(/\/notes$/);

    await logout(page);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("shows an error for invalid credentials and allows a later valid login", async ({
    page,
  }) => {
    const credentials = createCredentials("auth-login");

    await register(page, credentials);
    await logout(page);

    await page.goto("/login");
    await page.getByLabel("Email").fill(credentials.email);
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("p[role='alert']")).toHaveText("Invalid email or password.");
    await expect(page).toHaveURL(/\/login$/);

    await login(page, credentials);
    await expect(page.getByRole("heading", { name: "Your notes" })).toBeVisible();
  });
});
