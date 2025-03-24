import { CONFIG } from "./config";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import routes from "./routes";

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
  .use(routes)
  .listen({ port: CONFIG.PORT });

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
