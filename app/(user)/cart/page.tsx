

"use client";

import { useCart } from "@/context/CartContext";
import { urlFor } from "@/sanity/lib/image";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();
  const router = useRouter();

  const DELIVERY_CHARGE = 5.99;
  const grandTotal = totalPrice + DELIVERY_CHARGE;

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.{" "}
          <Link href="/" className="text-indigo-600 hover:underline">
            Continue Shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side: Cart Items */}
          <div className="md:col-span-2 flex flex-col">
            <div className="bg-white shadow-md border rounded-md p-4 flex-1">
              {cart.map((item) => (
                <div key={item.slug} className="border-b py-3">
                  <div className="flex items-center gap-4">
                    <Image
                      src={urlFor(item.image).url() || "/placeholder.png"} 
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md size-14"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold line-clamp-2">{item.name}</p>
                      <div className="flex w-full justify-between items-center mt-2">
                        <p className="text-gray-600">৳ {item.price.toFixed(2)}</p>
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => decreaseQuantity(item.slug)}
                              className="border w-8 flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="text-center border-y min-w-[40px] px-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.slug)}
                              className="border w-8 flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.slug)}
                            className="text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Summary */}
          <div>
            <div className="bg-white shadow-md rounded-md p-4 border">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>৳ {totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Delivery Charge</p>
                <p>৳ {DELIVERY_CHARGE.toFixed(2)}</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>৳ {grandTotal.toFixed(2)}</p>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
