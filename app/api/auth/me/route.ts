import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "../../utils/auth";

export async function GET(request: NextRequest) {
  const result = await verifyAuth(request);

  if (!result.success) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }

  return NextResponse.json({ user: result.user });
}
