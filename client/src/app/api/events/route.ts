import { NextRequest, NextResponse } from "next/server";

const events = [
  { id: "1", title: "Event 1", start: "2025-02-01" },
  { id: "2", title: "Event 2", start: "2025-02-18", end: "2025-02-22" },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(events);
}
