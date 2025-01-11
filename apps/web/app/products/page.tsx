import Link from "next/link";
import prisma from "@repo/db";

const ProductsPage = async () => {
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

    return (
      <div>
        <h1>Product Listings</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    margin: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Seller: {product.user?.name || "Unknown"}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product listings:", error);
    return <div>Error loading product listings.</div>;
  }
};

export default ProductsPage;
