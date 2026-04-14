import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  push,
  refresh,
  createNoteAction,
  updateNoteAction,
  deleteNoteAction,
  enableShareAction,
  disableShareAction,
  writeText,
} = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  createNoteAction: vi.fn(),
  updateNoteAction: vi.fn(),
  deleteNoteAction: vi.fn(),
  enableShareAction: vi.fn(),
  disableShareAction: vi.fn(),
  writeText: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    refresh,
  }),
}));

vi.mock("@/src/lib/notes/actions", () => ({
  createNoteAction,
  updateNoteAction,
  deleteNoteAction,
  enableShareAction,
  disableShareAction,
}));

vi.mock("@/src/components/notes/rich-text-editor", () => ({
  RichTextEditor: ({
    initialContent,
    onContentChange,
  }: {
    initialContent: { content?: Array<{ text?: string }> };
    onContentChange: (value: unknown) => void;
  }) => (
    <textarea
      aria-label="Note content"
      defaultValue={initialContent.content?.[0]?.text ?? ""}
      onChange={(event) =>
        onContentChange({
          type: "doc",
          content: [{ type: "paragraph", content: [{ type: "text", text: event.target.value }] }],
        })
      }
    />
  ),
}));

import { NOTE_AUTOSAVE_DEBOUNCE_MS } from "@/src/lib/notes/constants";
import { NoteEditorForm } from "@/src/components/notes/note-editor-form";

const emptyContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

describe("NoteEditorForm", () => {
  beforeEach(() => {
    push.mockReset();
    refresh.mockReset();
    createNoteAction.mockReset();
    updateNoteAction.mockReset();
    deleteNoteAction.mockReset();
    enableShareAction.mockReset();
    disableShareAction.mockReset();
    writeText.mockReset();
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText,
      },
    });
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates notes and navigates to the new detail page", async () => {
    createNoteAction.mockResolvedValue({
      ok: true,
      data: {
        noteId: "note-1",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    });

    render(<NoteEditorForm mode="create" initialTitle="" initialContent={emptyContent} />);
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "New note" } });
    fireEvent.change(screen.getByLabelText("Note content"), { target: { value: "Body text" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(createNoteAction).toHaveBeenCalledWith({
        title: "New note",
        contentJson: {
          type: "doc",
          content: [{ type: "paragraph", content: [{ type: "text", text: "Body text" }] }],
        },
      });
      expect(push).toHaveBeenCalledWith("/notes/note-1");
      expect(refresh).toHaveBeenCalled();
    });
  });

  it("autosaves edits after the debounce window", async () => {
    vi.useFakeTimers();
    updateNoteAction.mockResolvedValue({
      ok: true,
      data: { updatedAt: "2026-01-01T00:00:00.000Z" },
    });

    render(
      <NoteEditorForm
        mode="edit"
        noteId="note-1"
        initialTitle="Existing"
        initialContent={emptyContent}
        initialShareEnabled={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Updated title" } });

    await vi.advanceTimersByTimeAsync(NOTE_AUTOSAVE_DEBOUNCE_MS + 50);
    await Promise.resolve();

    expect(updateNoteAction).toHaveBeenCalledWith({
      id: "note-1",
      title: "Updated title",
      contentJson: emptyContent,
      reason: "autosave",
    });

    vi.useRealTimers();
  });

  it("deletes notes after confirmation", async () => {
    deleteNoteAction.mockResolvedValue({
      ok: true,
      data: { deleted: true },
    });

    render(
      <NoteEditorForm
        mode="edit"
        noteId="note-1"
        initialTitle="Existing"
        initialContent={emptyContent}
        initialShareEnabled={false}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Delete note" }));

    await waitFor(() => {
      expect(deleteNoteAction).toHaveBeenCalledWith({ id: "note-1" });
      expect(push).toHaveBeenCalledWith("/notes");
      expect(refresh).toHaveBeenCalled();
    });
  });

  it("enables sharing and copies the generated link", async () => {
    enableShareAction.mockResolvedValue({
      ok: true,
      data: {
        shareToken: "token-1",
        shareUrl: "http://localhost:3000/s/token-1",
      },
    });

    render(
      <NoteEditorForm
        mode="edit"
        noteId="note-1"
        initialTitle="Existing"
        initialContent={emptyContent}
        initialShareEnabled={false}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Enable sharing" }));

    expect(await screen.findByDisplayValue("http://localhost:3000/s/token-1")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("http://localhost:3000/s/token-1");
    });
  });
});
