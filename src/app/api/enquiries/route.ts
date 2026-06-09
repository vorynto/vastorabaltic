import { NextResponse } from "next/server";
import { createEnquiry, isAdminRequest, listEnquiries } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await listEnquiries());
}

export async function POST(request: Request) {
  const enquiry = await request.json();

  if (!enquiry.name || !enquiry.email || !enquiry.message) {
    return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
  }

  return NextResponse.json(await createEnquiry(enquiry), { status: 201 });
}
