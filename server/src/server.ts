import { logger } from "./utils/Logger";
import { handler } from "./app";

const server = Bun.serve({
  port: process.env.PORT || 3032,
  async fetch(req: Request): Promise<Response> {
    try {
      const url = new URL(req.url);
      const method = req.method;
      const headers = Object.fromEntries(req.headers.entries());
      const body = await req.text();

      const event = {
        httpMethod: method,
        path: url.pathname,
        headers,
        body: body ? JSON.parse(body) : undefined,
      };

      const result = await handler(event as any);

      return new Response(result.body, {
        status: result.statusCode,
        headers: result.headers
          ? (Object.entries(result.headers).map(([key, value]) => [
              key,
              value !== undefined ? String(value) : "",
            ]) as [string, string][])
          : undefined,
      });
    } catch (error) {
      logger.error("Error processing request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
});

logger.info(`Server is running on http://localhost:${server.port}`);
