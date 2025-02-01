import mockUsers from "./mockUsers.json";

export async function GET() {
  return Response.json(mockUsers);
}
