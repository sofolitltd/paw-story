"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: string;
}

interface ProductSliderProps {
  products: Product[];
}

const CatFoodProducts: React.FC<ProductSliderProps> = ({ products }) => {
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
      <h2 className="text-2xl font-semibold mb-4">CAT FOOD</h2>

      <div
        className="relative "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Products Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 lg:gap-6 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4 py-4 "
        >
          {products.map((product) => (
            <div
              key={product.slug}
              className="relative bg-white rounded-lg hover:shadow-md border group flex flex-col"
            >
              {/* Product Link */}
              <Link
                href={`/product/${product.slug}`}
                className="block flex-grow"
              >
                {/* Added flex-grow */}
                <div className="min-w-[240px] bg-slate-50 group-hover:bg-[#F6EEE4] transition-colors duration-300 rounded-tl-md rounded-tr-md overflow-hidden p-4">
                  {/* Added overflow-hidden */}
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200} // Reduced height
                    className="object-cover w-full" // Changed to object-cover
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-indigo-800">
                      {product.price}
                    </p>

                    <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hidden group-hover:flex">
                      <Heart color="#ef4444" size={20} />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Add to Cart Link (Separated) */}
              <div className=" px-3 pb-3">
                <Link href="/cart" className="block">
                  <div
                    className="flex gap-2 items-center justify-center rounded-md border border-red-500 p-2 cursor-pointer transition-all duration-300
                    text-red-500 hover:bg-red-500 hover:text-white group-hover:bg-red-500 group-hover:text-white"
                  >
                    <ShoppingCart size={20} />
                    <p>Add to Cart</p>
                  </div>
                </Link>
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

export default CatFoodProducts;
