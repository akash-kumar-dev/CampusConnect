import { NextResponse } from "next/server";
import prisma from "@repo/db";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function GET(request: Request) {
  const id = request.url.split('/').pop();
  
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const product = await prisma.productListing.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            college: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
} 