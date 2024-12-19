import { NextRequest, NextResponse } from "next/server";

import { APIResponse } from "@/types";
import { auth } from "@/lib/firebase/firebase-admin";
// Adjust if you need to import auth

export async function POST(request: NextRequest) {
  const { sessionCookie } = await request.json();

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;
    const email = decodedClaims.email;

    return NextResponse.json<APIResponse<{ user: { uid: string, email: string } }>>({
      success: true,
      data: { user: { uid, email: email ?? "" } },
    });
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ success: false, error: "Invalid session" }, { status: 401 });
  }
}
