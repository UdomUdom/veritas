import { describe, test, expect } from "bun:test";
import { resetPassword } from "../../../services/users/password";

describe("Reset password", () => {
  test("Should reset password successfully", async () => {
    const result = await resetPassword({
      email: "admin@veritas.co",
      new_password: "admin",
    });
    expect(result).toBe("Password reset success");
  });

  test("Should throw error if user is not found", () => {
    const result = resetPassword({
      email: "reset-password@veritas.co",
      new_password: "test",
    });
    expect(result).rejects.toThrow("Profile not found");
  });
});
