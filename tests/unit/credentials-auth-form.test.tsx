import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { push, refresh, signInEmail, signUpEmail } = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  signInEmail: vi.fn(),
  signUpEmail: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    refresh,
  }),
}));

vi.mock("@/src/lib/auth-client", () => ({
  authClient: {
    signIn: {
      email: signInEmail,
    },
    signUp: {
      email: signUpEmail,
    },
  },
}));

import { CredentialsAuthForm } from "@/src/components/auth/credentials-auth-form";

describe("CredentialsAuthForm", () => {
  beforeEach(() => {
    push.mockReset();
    refresh.mockReset();
    signInEmail.mockReset();
    signUpEmail.mockReset();
  });

  it("validates missing credentials before submitting", async () => {
    render(<CredentialsAuthForm mode="login" />);

    fireEvent.submit(screen.getByRole("button", { name: "Login" }).closest("form")!);

    expect((await screen.findByRole("alert")).textContent).toBe(
      "Please provide both email and password.",
    );
    expect(signInEmail).not.toHaveBeenCalled();
  });

  it("shows login errors from the auth client", async () => {
    signInEmail.mockResolvedValue({ error: { message: "Invalid" } });

    render(<CredentialsAuthForm mode="login" />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "USER@Example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect((await screen.findByRole("alert")).textContent).toBe("Invalid email or password.");
    expect(signInEmail).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123",
      callbackURL: "/notes",
    });
  });

  it("submits registration and navigates on success", async () => {
    let resolveSubmission: ((value: { error: null }) => void) | undefined;
    signUpEmail.mockReturnValue(
      new Promise((resolve) => {
        resolveSubmission = resolve;
      }),
    );

    render(<CredentialsAuthForm mode="register" />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "new-user@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(
      screen.getByRole("button", { name: "Submitting..." }).getAttribute("disabled"),
    ).not.toBeNull();

    resolveSubmission?.({ error: null });

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/notes");
      expect(refresh).toHaveBeenCalled();
    });
    expect(signUpEmail).toHaveBeenCalledWith({
      email: "new-user@example.com",
      password: "password123",
      name: "new-user",
      callbackURL: "/notes",
    });
  });
});
