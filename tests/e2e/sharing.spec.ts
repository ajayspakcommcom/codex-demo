import { expect, test } from "@playwright/test";
import { createCredentials, login, logout, register } from "./helpers/auth";
import { createNote } from "./helpers/notes";

test.describe("sharing", () => {
  test("shares a note publicly, invalidates old links, and disables access", async ({ page }) => {
    const credentials = createCredentials("sharing");

    await register(page, credentials);
    await createNote(page, {
      title: "Shared note",
      bodyText: "Shared body text",
    });

    await page.getByRole("button", { name: "Enable sharing" }).click();
    const shareInput = page.getByLabel("Share link");
    await expect(shareInput).toBeVisible();
    const firstShareUrl = await shareInput.inputValue();

    await logout(page);
    await page.goto(firstShareUrl);
    await expect(page.getByRole("heading", { name: "Shared note" })).toBeVisible();
    await expect(page.getByText("Shared body text")).toBeVisible();

    await login(page, credentials);
    await page.goto("/notes");
    await page.getByRole("link", { name: /Shared note/i }).click();
    await page.getByRole("button", { name: "Regenerate link" }).click();
    await expect(shareInput).toBeVisible();
    const regeneratedUrl = await shareInput.inputValue();
    expect(regeneratedUrl).not.toBe(firstShareUrl);

    await logout(page);
    await page.goto(firstShareUrl);
    await expect(page.getByRole("heading", { name: "404 - Resource Not Found" })).toBeVisible();

    await login(page, credentials);
    await page.goto("/notes");
    await page.getByRole("link", { name: /Shared note/i }).click();
    await page.getByRole("button", { name: "Disable sharing" }).click();

    await logout(page);
    await page.goto(regeneratedUrl);
    await expect(page.getByRole("heading", { name: "404 - Resource Not Found" })).toBeVisible();
  });

  test("rejects invalid share-token formats with a 404", async ({ page }) => {
    await page.goto("/s/not-a-valid-token");

    await expect(page.getByRole("heading", { name: "404 - Resource Not Found" })).toBeVisible();
  });
});
