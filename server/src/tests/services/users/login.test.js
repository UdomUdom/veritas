import { describe, test, expect } from "bun:test";
import { userLogin } from "../../../services/users/login";

describe("User login", () => {
  test("Should login successfully with valid credentials", async () => {
    const result = await userLogin({ username: "admin", password: "admin" });
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  test("Should throw error if user is not found", () => {
    const result = userLogin({ username: "user", password: "pass" });
    expect(result).rejects.toThrow("User not found");
  });

  test("Should throw error if password is invalid", () => {
    const result = userLogin({ username: "admin", password: "pass" });
    expect(result).rejects.toThrow("Invalid password");
  });
});
