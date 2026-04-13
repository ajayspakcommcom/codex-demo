import { expect, test } from "@playwright/test";

test.describe("public share scaffold", () => {
  test("renders the shared note placeholder with token-specific copy", async ({ page }) => {
    await page.goto("/s/example-public-token");

    await expect(page.getByRole("heading", { name: "Shared note" })).toBeVisible();
    await expect(page.getByText("example-public-token")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Sanitized HTML output placeholder" }),
    ).toBeVisible();
    await expect(page.getByText("Shared content preview")).toBeVisible();
  });
});
