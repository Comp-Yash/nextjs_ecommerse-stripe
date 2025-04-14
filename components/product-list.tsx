"use client";

import Stripe from "stripe";
import { ProductCard } from "@/components/product-card";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  
  const [searchTerm, setSearchTerm] = useState<string>("");

  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, " ")   // Normalize spaces (e.g., multiple spaces become one)
      .trim();                // Remove leading/trailing spaces
  };
  
  const filteredProduct = products.filter((product) => {
    const term = normalizeString(searchTerm);  // Normalize the search term
    const nameMatch = normalizeString(product.name).includes(term);  // Normalize product name
    const descriptionMatch = product.description
      ? normalizeString(product.description).includes(term)
      : false;
  
    // Check if metadata contains matching search term with normalized strings
    const metadataMatch =
      product.metadata &&
      Object.values(product.metadata).some((value) =>
        normalizeString(value).includes(term)
      );
  
    return nameMatch || metadataMatch;
  });
  

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProduct.map((product, key) => (
          <li key={key}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};