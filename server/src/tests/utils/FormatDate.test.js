import { describe, it, expect } from "bun:test";
import { FormatDate, FormatTime } from "../../utils/FormatDate";

describe("format date", () => {
  it("should format date correctly", () => {
    const date = new Date("2023-10-01T00:00:00Z");
    const formattedDate = FormatDate(date);
    expect(formattedDate).toBe("2023-10-01");
  });

  it("should handle invalid date", () => {
    const date = new Date("invalid-date");
    const formattedDate = FormatDate(date);
    expect(formattedDate).toBe("Invalid Date");
  });
});

describe("format time", () => {
  it("should format time correctly", () => {
    const date = new Date("2023-10-01T12:30:00Z");
    const formattedTime = FormatTime(date);
    expect(formattedTime).toBe("12:30");
  });

  it("should handle invalid time", () => {
    const date = new Date("invalid-date");
    const formattedTime = FormatTime(date);
    expect(formattedTime).toBe("Invalid Date");
  });
});
