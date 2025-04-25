import { describe, expect, test, vi } from "bun:test";
import { ErrorHandler, SuccessHandler } from "../../utils/Handler";

describe("ErrorHandler", () => {
  test("should return error message when error is instance of Error", () => {
    const result = ErrorHandler(new Error("Something went wrong"));
    expect(result).toEqual({
      status: "error",
      message: "Something went wrong",
    });
  });

  test("should return generic message when error is not instance of Error", () => {
    const result = ErrorHandler("Not an error object");
    expect(result).toEqual({
      status: "error",
      message: "An error occurred",
    });
  });
});

describe("SuccessHandler", () => {
  test("should return ok status with message and data", () => {
    const result = SuccessHandler({
      message: "Success!",
      data: { id: 1 },
    });
    expect(result).toEqual({
      status: "ok",
      message: "Success!",
      data: { id: 1 },
    });
  });

  test("should work even if message or data is undefined", () => {
    const result = SuccessHandler({});
    expect(result).toEqual({
      status: "ok",
      message: undefined,
      data: undefined,
    });
  });
});
