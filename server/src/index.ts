import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

new Elysia()
  .use(swagger())
  .get("/", () => "Hello World!")
  .listen(3030, () => console.log("Server is running on port 3020"));
