import { logger } from "./Logger";

export const ErrorHandler = (error: unknown) => {
  logger.error(error);
  return {
    status: "error",
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

export const SuccessHandler = ({
  message,
  data,
}: {
  message?: string;
  data?: unknown;
}) => {
  logger.info(message);
  return {
    status: "ok",
    message,
    data,
  };
};
