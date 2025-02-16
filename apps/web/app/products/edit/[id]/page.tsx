"use client";

import { useEffect, useState } from "react";
import { Navbar } from "../../../../components/Navbar/Navbar";
import { Footer } from "../../../../components/Footer/Footer";
import { ProductForm } from "../../../../components/Products/ProductForm";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  tags: string[];
  sellingScope: "COLLEGE_ONLY" | "ALL_COLLEGES";
}

export default function EditProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>
          <ProductForm mode="edit" initialData={product} />
        </div>
      </main>
      <Footer />
    </div>
  );
} 