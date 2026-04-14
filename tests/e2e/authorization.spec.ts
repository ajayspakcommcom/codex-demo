import { expect, test } from "@playwright/test";
import { createCredentials, logout, register } from "./helpers/auth";
import { createNote } from "./helpers/notes";

test.describe("authorization", () => {
  test("redirects unauthenticated access to protected routes", async ({ page }) => {
    await page.goto("/notes");
    await expect(page).toHaveURL(/\/login$/);

    await page.goto("/notes/new");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("prevents other signed-in users from opening another user's note", async ({ page }) => {
    const owner = createCredentials("owner");
    const outsider = createCredentials("outsider");

    await register(page, owner);
    const note = await createNote(page, {
      title: "Owner only",
      bodyText: "This should not be visible to another account.",
    });

    await logout(page);
    await register(page, outsider);
    await page.goto(note.url);

    await expect(page.getByRole("heading", { name: "404 - Resource Not Found" })).toBeVisible();
  });

  test("shows the custom 404 for unknown routes", async ({ page }) => {
    await page.goto(`/missing-route-${Date.now()}`);

    await expect(page.getByRole("heading", { name: "404 - Resource Not Found" })).toBeVisible();
    await expect(page.getByText("The requested page or resource does not exist.")).toBeVisible();
  });
});
