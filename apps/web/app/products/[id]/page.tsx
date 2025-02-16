"use client";

import { useEffect, useState } from "react";
import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  tags: string[];
  college: string;
  sellingScope: "COLLEGE_ONLY" | "ALL_COLLEGES";
  createdAt: string;
  user: {
    name: string;
    email: string;
    college: string;
  };
}

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error || "Product not found"}</div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwner = session?.user?.email === product.user.email;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="relative h-72 md:h-full">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-8 md:w-1/2">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <span className="text-2xl font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  Posted by {product.user.name} • {product.college}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Selling Scope:</span>
                  <span className="font-medium">
                    {product.sellingScope === "COLLEGE_ONLY" 
                      ? "College Only" 
                      : "All Colleges"}
                  </span>
                </div>

                {isOwner ? (
                  <Link
                    href={`/products/edit/${product.id}`}
                    className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Edit Product
                  </Link>
                ) : (
                  <button
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => window.location.href = `mailto:${product.user.email}?subject=Interested in: ${product.title}`}
                  >
                    Contact Seller
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage; 