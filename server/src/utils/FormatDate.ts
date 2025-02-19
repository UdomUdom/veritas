export const FormatDate = (date: Date) => {
  try {
    return date.toISOString().split("T")[0];
  } catch (error) {
    return "Invalid Date";
  }
};

export const FormatTime = (date: Date) => {
  try {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "Invalid Date";
  }
};
