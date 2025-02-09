import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const body = await request.json();
  const res = await fetch(process.env.API_URL + "/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const setCookieHeader = res.headers.get("set-cookie");
  const session = setCookieHeader
    ? setCookieHeader.split(";")[0].split("=")[1]
    : null;
  if (session) {
    cookieStore.set("session", session);
  }
  return new Response(await res.json(), {
    headers: {
      "set-cookie": `session=${session}; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}
