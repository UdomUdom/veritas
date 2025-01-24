import { test, expect } from "bun:test";
import req from "supertest";

test("Hello World", async () => {
  const res = await req("http://localhost:3032").get("/helloworld");
  expect(res.status).toBe(200);
  expect(res.text).toBe("Hello World!");
});
