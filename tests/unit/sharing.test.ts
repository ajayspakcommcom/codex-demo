import { afterEach, describe, expect, it } from "vitest";
import {
  buildShareUrl,
  generateShareToken,
  hashShareToken,
  isValidShareToken,
} from "@/src/lib/notes/sharing";

const previousAppUrl = process.env.APP_URL;

afterEach(() => {
  process.env.APP_URL = previousAppUrl;
});

describe("sharing helpers", () => {
  it("generates valid share tokens", () => {
    const token = generateShareToken();

    expect(token).toHaveLength(43);
    expect(isValidShareToken(token)).toBe(true);
  });

  it("hashes share tokens deterministically", () => {
    expect(hashShareToken("token-1")).toBe(hashShareToken("token-1"));
    expect(hashShareToken("token-1")).not.toBe(hashShareToken("token-2"));
  });

  it("builds share urls from the configured app url", () => {
    process.env.APP_URL = "https://tinynotes.example.com/";

    expect(buildShareUrl("abc")).toBe("https://tinynotes.example.com/s/abc");
  });

  it("validates token shape strictly", () => {
    expect(isValidShareToken("a".repeat(43))).toBe(true);
    expect(isValidShareToken("short-token")).toBe(false);
    expect(isValidShareToken("a".repeat(44))).toBe(false);
    expect(isValidShareToken("a".repeat(42) + "!")).toBe(false);
  });
});
