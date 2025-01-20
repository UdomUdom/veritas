import { config } from "./config";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import routes from "./routes";

const app = new Elysia({
  cookie: {
    secrets: config.SECRET_KEY,
    sameSite: "strict",
    priority: "high",
    ...config.COOKIE_OPTIONS,
  },
})
  .use(
    swagger({
      exclude: ["/swagger"],
      autoDarkMode: true,
      documentation: {
        info: {
          title: "Veritas API",
          description: "Bun + ElysiaJS + PostgreSQL",
          version: "0.0.1",
          license: {
            name: "MIT",
            url: "https://opensource.org/license/mit/",
          },
        },
      },
    })
  )
  .get("/helloworld", () => "Hello World!")
  .use(routes)
  .listen({ port: config.PORT });

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
