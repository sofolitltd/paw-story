"use client";
import { ShoppingCart } from "iconsax-react";
import React from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

interface AddToCartProps {
  product: Product;
  fullWidth?: boolean;
}

export default function AddToCart({ product, fullWidth = true }: AddToCartProps) {
  const { addToCart } = useCart();

  // Make sure the image is a valid string
  const imageUrl = product.images[0]?.asset._ref;
  console.log(imageUrl + ' ok');

  // Convert full Product object to CartProduct
  const cartProduct = {
    id: product._id,  // assuming _id is a string
    name: product.name,
    price: product.salePrice ?? product.regularPrice ?? 0,
    image: imageUrl, // Pass the image URL
    slug: product.slug.current,
    quantity: 1,
  };

  return (
    <div className={`${fullWidth ? "w-full px-3 pb-3" : ""}`}>
      <button onClick={() => addToCart(cartProduct)} className={fullWidth ? "w-full" : ""}>
        <div
          className={`flex gap-2 items-center justify-center rounded-md border border-red-500 py-2 px-4 lg:px-10 cursor-pointer transition-all duration-300
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
