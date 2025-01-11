import { NextResponse } from "next/server";
import prisma from "@repo/db";

export async function GET() {
  try {
    const products = await prisma.productListing.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching product listings:", error);

    return NextResponse.json(
      { error: "Failed to fetch product listings" },
      { status: 500 }
    );
  }
}
