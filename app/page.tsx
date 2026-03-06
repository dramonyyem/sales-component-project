"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { InputSearch } from "@/components/InputSearch";
import { Card } from "@/components/Card";
import { Advertising } from "@/components/Advertising";
import { useUsers } from "@/features/users/hooks";

const products = [
  {
    id: 1,
    name: "Minimal White Shirt",
    price: 29,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 2,
    name: "Modern Sneakers",
    price: 89,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 120,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
  },
  {
    id: 4,
    name: "Black Hoodie",
    price: 59,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
  },
];

const advertisements = [
  {
    id: 1,
    title: "🔥 Summer Sale 50% OFF",
    subtitle: "Limited time promotion",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
  },
  {
    id: 2,
    title: "🚚 Free Shipping",
    subtitle: "On orders over $50",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a",
  },
  {
    id: 3,
    title: "🎁 Buy 2 Get 1 Free",
    subtitle: "Selected products only",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
];

export default function ShopPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, isLoading, error } = useUsers();

  console.log(data);
  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % advertisements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-87.5 overflow-hidden">
        {advertisements.map((ad, index) => (
          <Advertising
            key={ad.id}
            ad={ad}
            index={index}
            currentSlide={currentSlide}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <InputSearch
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSearch={handleSearch}
        />
        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No products found.</p>
        )}
        
      </div>
    </div>
  );
}
