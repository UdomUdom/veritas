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

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { httpMethod, path, headers, body } = event;

    const response = await app.handle(
      new Request(`https://example.com${path}`, {
        method: httpMethod,
        headers: new Headers(headers as Record<string, string>),
        body: body ? JSON.stringify(body) : undefined,
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
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
