import { describe, it, expect } from "vitest";
import { sha256Hex } from "../dist/utils/hash.js";

describe("hash utils", () => {
  it("sha256Hex should be deterministic", () => {
    const a = sha256Hex("hello");
    const b = sha256Hex("hello");
    expect(a).toBe(b);
    expect(a).toHaveLength(64);
  });
});