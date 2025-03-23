import { Elysia } from "elysia";
import { config } from "./config";
import swagger from "@elysiajs/swagger";
import routes from "./routes";
import { cors } from "@elysiajs/cors";

const app = new Elysia({
  cookie: {
    secrets: config.SECRET_KEY,
    httpOnly: config.COOKIE.httpOnly,
    sameSite: config.COOKIE.sameSite,
    secure: config.COOKIE.secure,
    priority: config.COOKIE.priority,
    maxAge: config.COOKIE.maxAge,
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
  .use(cors())
  .get("/helloworld", () => "Hello World!")
  .use(routes)
  .listen({ port: config.PORT });

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
