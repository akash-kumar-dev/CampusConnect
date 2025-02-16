"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../../components/Products/ProductCard";
import { ProductFilter } from "../../components/Products/ProductFilter";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  tags: string[];
  college: string;
  sellingScope: "COLLEGE_ONLY" | "ALL_COLLEGES";
  user: {
    name: string;
    email: string;
    college: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    college: "",
    sellingScope: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/all");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filters.college && product.college !== filters.college) return false;
    if (filters.sellingScope && product.sellingScope !== filters.sellingScope) return false;
    if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Products</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64">
            <ProductFilter filters={filters} setFilters={setFilters} />
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 