"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Heart, ShoppingBag } from "iconsax-react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}

interface ProductSliderProps {
  products: Product[];
}

const FeaturesProducts: React.FC<ProductSliderProps> = ({
  products,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Infinite Auto Scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          // Reset to start when reaching the end
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 7500);

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
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">FEATURED PRODUCTS</h2>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Products Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4 py-4"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="relative min-w-[280px] min-h-[280px] bg-white p-4 rounded-lg shadow-md snap-start transition-transform hover:shadow-md hover:-translate-y-1.5  border "
            >
              {/* Heart Icon Positioned Top Right */}
              <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md">
                <Heart color="#ef4444" size={20} />
              </div>

              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                width={260}
                height={260}
                className="object-contain w-full  rounded-lg"
              />

              {/* Product Name */}
              <h3 className="text-md font-semibold mt-2">{product.name}</h3>

              {/* Price and Cart Button */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-xl font-bold text-indigo-800">
                  {product.price}
                </p>
                <div className="rounded-full border p-2 cursor-pointer hover:bg-gray-100">
                  <ShoppingBag color="#000" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows (Shown on Hover) */}
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

export default FeaturesProducts;
