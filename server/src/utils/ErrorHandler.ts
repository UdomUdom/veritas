export const ErrorHandler = (error: unknown) => {
  return {
    status: "error",
    message: error instanceof Error ? error.message : "An error occurred",
  };
};
