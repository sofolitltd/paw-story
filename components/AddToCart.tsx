'use client'
import { ShoppingCart } from "iconsax-react";
import React from "react";
import { useCart } from "@/context/CartContext";

interface AddToCartProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    slug: string;
    quantity?: number;
  };
  fullWidth?: boolean; // Optional param to control full or fit width
}

export default function AddToCart({ product, fullWidth = true }: AddToCartProps) {
  const { addToCart } = useCart();

  return (
    <div className={`${fullWidth ? "w-full px-3 pb-3" : ""}`}>
      <button onClick={() => addToCart(product)} className={fullWidth ? "w-full" : ""}>
        <div
          className={`flex gap-2 items-center justify-center rounded-md border border-red-500 py-2 px-8 cursor-pointer transition-all duration-300
          text-red-500 hover:bg-red-500 hover:text-white group-hover:bg-red-500 group-hover:text-white 
          ${fullWidth ? "w-full" : ""}`} 
        >
          <ShoppingCart size={20} color="currentColor" />
          <p>Add to Cart</p>
        </div>
      </button>
    </div>
  );
}
