import { getNewArrivals } from "@/actions/new-arrivals";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 8;

    const products = await getNewArrivals(limit);
    return NextResponse.json(products);
  } catch (error) {
    console.error("New arrivals API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
