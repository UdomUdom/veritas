import mockUsers from "./mockUsers.json";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  return Response.json(mockUsers);
}

export async function POST(request: Request) {
  let newUser = await request.json();
  newUser = { id: mockUsers.length + 1, ...newUser };
  const filePath = path.join(process.cwd(), "src/app/api/users/mockUsers.json");

  const users = JSON.parse(await fs.readFile(filePath, "utf-8"));
  users.push(newUser);

  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
