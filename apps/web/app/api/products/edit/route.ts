import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId, title, description, price, imageUrl, tags } = body;

    if (!productId || !title || !description || !price || !Array.isArray(tags)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const product = await prisma.productListing.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if the logged-in user owns the product
    if (product.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only edit your own products" },
        { status: 403 }
      );
    }

    const updatedProduct = await prisma.productListing.update({
      where: { id: productId },
      data: {
        title,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        tags,
      },
    });

    return NextResponse.json(
      { message: "Product updated successfully", updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}