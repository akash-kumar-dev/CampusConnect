"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SellingScope } from "@repo/db/types";

interface ProductFormProps {
  mode: "add" | "edit";
  initialData?: {
    id?: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string | null;
    tags: string[];
    sellingScope: SellingScope;
  };
}

interface ProductPayload {
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  tags: string[];
  sellingScope: SellingScope;
  productId?: string;
}

export const ProductForm = ({ mode, initialData }: ProductFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    imageUrl: initialData?.imageUrl || "",
    tags: initialData?.tags?.join(", ") || "",
    sellingScope: initialData?.sellingScope || "COLLEGE_ONLY",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload: ProductPayload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price.toString()),
        imageUrl: formData.imageUrl || null,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        sellingScope: formData.sellingScope as SellingScope,
      };

      if (mode === "edit" && initialData?.id) {
        payload.productId = initialData.id;
      }

      const response = await fetch(`/api/products/${mode === "add" ? "add" : "edit"}`, {
        method: mode === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save product");
      }

      router.push("/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., books, electronics, furniture"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selling Scope
          </label>
          <select
            name="sellingScope"
            value={formData.sellingScope}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="COLLEGE_ONLY">College Only</option>
            <option value="ALL_COLLEGES">All Colleges</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          {loading ? "Saving..." : mode === "add" ? "Add Product" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}; 