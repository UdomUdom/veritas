import { config } from "./config";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import routes from "./routes";
import cors from "@elysiajs/cors";

const app = new Elysia({
  cookie: {
    secrets: config.SECRET_KEY,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    priority: "high",
    maxAge: 3600000,
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
  .use(
    cors({
      origin: [`${process.env.CLIENT_URL}`],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  )
  .get("/helloworld", () => "Hello World!")
  .use(routes)
  .listen({ port: config.PORT });

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
