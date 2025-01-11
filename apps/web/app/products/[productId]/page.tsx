import prisma from "@repo/db";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  try {
    const { productId } = await params; 

    const product = await prisma.productListing.findUnique({
      where: {
        id: productId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!product) {
      return <div>Product not found.</div>;
    }

    return (
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Seller: {product.user?.name || "Unknown"}</p>
        <p>Email: {product.user?.email}</p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return <div>Error loading product details.</div>;
  }
};

export default ProductPage;
