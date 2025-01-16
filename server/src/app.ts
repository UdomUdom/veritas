import { config } from "./config";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import routes from "./routes";
import cookie from "@elysiajs/cookie";

const app = new Elysia()
  .use(
    cookie({
      ...config.COOKIE_OPTIONS,
      secret: config.SECRET_KEY,
    })
  )
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
