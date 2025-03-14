"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto Scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Manual Scroll
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scrollable Products */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto whitespace-nowrap scrollbar-hide snap-x snap-mandatory scroll-smooth px-4 py-4 gap-4 md:gap-6 lg:gap-6"
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div key={product._id} className="">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {isHovered && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
