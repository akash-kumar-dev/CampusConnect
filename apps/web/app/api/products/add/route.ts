import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;

    if (!user.email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const body = await req.json();
    const { title, description, price, imageUrl, tags } = body;

    if (!title || !description || !price || !Array.isArray(tags)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const product = await prisma.productListing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        tags,
        user: {
          connect: { email: user.email as string },
        },
      },
    });

    return NextResponse.json(
      { message: "Product added successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }

}