import { expect, test } from "@playwright/test";
import { createCredentials, register } from "./helpers/auth";
import { createNote } from "./helpers/notes";

test.describe("notes", () => {
  test("shows an empty state for a new user and creates an untitled note", async ({ page }) => {
    const credentials = createCredentials("notes-empty");

    await register(page, credentials);
    await expect(page.getByRole("heading", { name: "No notes yet" })).toBeVisible();

    await createNote(page, { bodyText: "First note body" });

    await expect(page.getByRole("heading", { name: "Edit note" })).toBeVisible();

    await page.goto("/notes");
    await expect(page.getByRole("link", { name: /Untitled note/i })).toBeVisible();
  });

  test("persists manual saves, autosaves later edits, and deletes notes", async ({ page }) => {
    const credentials = createCredentials("notes-edit");

    await register(page, credentials);
    await createNote(page, { title: "Draft title", bodyText: "First revision" });

    const editor = page.locator("div[contenteditable='true']").first();

    await page.getByLabel("Title").fill("Project plan");
    await editor.click();
    await editor.fill("Manual save content");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText(/^Saved$/)).toBeVisible();

    await page.reload();
    await expect(page.getByLabel("Title")).toHaveValue("Project plan");
    await expect(editor).toContainText("Manual save content");

    await editor.click();
    await editor.fill("Autosaved content");
    await expect(page.getByText("Unsaved changes")).toBeVisible();
    await expect(page.getByText(/^Saved$/)).toBeVisible({ timeout: 6_000 });

    await page.reload();
    await expect(editor).toContainText("Autosaved content");

    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Delete note" }).click();

    await expect(page).toHaveURL(/\/notes$/);
    await expect(page.getByRole("link", { name: /Project plan/i })).toHaveCount(0);
  });
});
