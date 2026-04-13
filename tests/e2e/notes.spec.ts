import { expect, test } from "@playwright/test";

test.describe("notes route scaffolds", () => {
  test("renders the notes index with shared layout chrome and empty-state placeholder", async ({
    page,
  }) => {
    await page.goto("/notes");

    await expect(page.getByRole("heading", { name: "Protected route scaffold" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Notes layout scaffold" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your notes" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Notes navigation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sample note list" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Empty state placeholder" })).toBeVisible();
  });

  test("renders the create-note scaffold with disabled controls", async ({ page }) => {
    await page.goto("/notes/new");

    await expect(page.getByRole("heading", { name: "Create note" })).toBeVisible();
    await expect(page.getByLabel("Title")).toBeDisabled();
    await expect(page.getByText("Unsaved changes")).toBeVisible();
    await expect(page.getByRole("button", { name: "Clear" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Save" })).toBeDisabled();
    await expect(page.getByRole("heading", { name: "Editor placeholder" })).toBeVisible();
  });

  test("renders the note detail scaffold with editor, status, and share panels", async ({
    page,
  }) => {
    await page.goto("/notes/example-note-id");

    await expect(page.getByRole("heading", { name: "Note workspace" })).toBeVisible();
    await expect(page.getByText("example-note-id")).toBeVisible();
    await expect(page.getByLabel("Title")).toBeDisabled();
    await expect(page.getByRole("heading", { name: "Editor placeholder" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Note status placeholder" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Share controls placeholder" })).toBeVisible();
    await expect(page.getByLabel("Share URL")).toBeDisabled();
    await expect(page.getByRole("button", { name: "Enable sharing" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Disable sharing" })).toBeDisabled();
  });
});
