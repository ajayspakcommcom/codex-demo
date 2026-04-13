import { expect, test } from "@playwright/test";

test.describe("fallback scaffolds", () => {
  test("shows the custom 404 scaffold for unknown routes", async ({ page }) => {
    await page.goto(`/missing-route-${Date.now()}`);

    await expect(page.getByRole("heading", { name: "404 - Resource Not Found" })).toBeVisible();
    await expect(page.getByText("The requested page or resource does not exist.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Return to the route overview" })).toBeVisible();
  });
});
