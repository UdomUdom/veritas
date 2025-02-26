import { describe, it, expect } from "bun:test";
import { ErrorHandler, SuccessHandler } from "../../utils/Handler";

describe("error handler", () => {
  it("should return error message when error is an instance of Error", () => {
    const error = new Error("Test error message");
    const result = ErrorHandler(error);
    expect(result).toEqual({
      status: "error",
      message: "Test error message",
    });
  });

  it("should return default error message when error is not an instance of Error", () => {
    const error = "Some error";
    const result = ErrorHandler(error);
    expect(result).toEqual({
      status: "error",
      message: "An error occurred",
    });
  });
});

describe("success handler", () => {
  it("should return success response with data", () => {
    const data = { key: "value" };
    const result = SuccessHandler(data);
    expect(result).toEqual({
      status: "ok",
      data,
    });
  });

  it("should return success response with null data", () => {
    const data = null;
    const result = SuccessHandler(data);
    expect(result).toEqual({
      status: "ok",
      data: null,
    });
  });
});
