import { NextResponse } from "next/server";
import mockUsers from "../mockUsers.json";
import mockInstructors from "../mockInstructors.json";

const allUsers = [...mockUsers, ...mockInstructors];

export async function GET_ALL(request: Request) {
  return NextResponse.json(allUsers);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = allUsers.find((u) => u.id === parseInt(params.id));
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedUser = await request.json();
  const index = allUsers.findIndex((u) => u.id === parseInt(params.id));

  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  allUsers[index] = { ...allUsers[index], ...updatedUser };

  return NextResponse.json(allUsers[index]);
}
