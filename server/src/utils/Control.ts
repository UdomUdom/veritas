import { ErrorHandler, SuccessHandler } from "./Handler";

export const withHandler = <T extends Record<string, any>>(
  handler: (ctx: T) => Promise<any>
) => {
  return async (ctx: T) => {
    try {
      const result = await handler(ctx);
      return SuccessHandler(result);
    } catch (err) {
      return ctx.error?.(400, ErrorHandler(err));
    }
  };
};
