"use client";

import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";
import { ProductForm } from "../../../components/Products/ProductForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SellProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Sell an Item</h1>
          <ProductForm mode="add" />
        </div>
      </main>
      <Footer />
    </div>
  );
} 