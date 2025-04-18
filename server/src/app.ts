import { logger } from "./utils/Logger";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import routes from "./routes";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const app = new Elysia()
  .use(
    swagger({
      exclude: ["/swagger"],
      autoDarkMode: true,
      documentation: {
        info: {
          title: "Veritas Open API",
          description: "Bun + ElysiaJS + Supabase",
          version: "0.0.1",
          license: {
            name: "MIT",
            url: "https://opensource.org/license/mit/",
          },
        },
      },
    })
  )
  .use(cors())
  .get("/hello", () => ({ status: "ok", message: "Hello Veritas!" }), {
    detail: {
      summary: "Hello Veritas",
      description: "A simple `Hello Veritas!` endpoint",
    },
  })
  .use(routes);

if (process.env.NODE_ENV === "development") {
  app.listen({ port: process.env.PORT || 3032 });
  logger.info(`Server running at ${app.server?.url}`);
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod;
  const path = event.path;
  const headers = event.headers;
  const body = event.body ? JSON.stringify(event.body) : undefined;

  const response = await app.handle(
    new Request(`http://localhost${path}`, {
      method,
      headers: new Headers(headers as HeadersInit),
      body,
    })
  );

  return {
    statusCode: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "application/json",
    },
    body: await response.text(),
  };
};
