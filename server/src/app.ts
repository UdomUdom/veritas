import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

const PORT = process.env.PORT || 3020;

export default new Elysia()
  .use(swagger())
  .get("/helloworld", () => "Hello World!")
  .listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
