import mockUsers from "./mockUsers.json";

export async function GET() {
  return Response.json(mockUsers);
}

export async function POST() {
  return Response.json(mockUsers);
}
