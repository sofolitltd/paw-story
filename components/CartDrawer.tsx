"use client";
import { useCart } from "@/context/CartContext";
import { urlFor } from "@/sanity/lib/image"; // Ensure this function correctly builds URLs
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    isCartOpen,
    toggleCart,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/30  z-40"
          onClick={toggleCart}
        />
      )}

      {/* Drawer Content */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 p-4 z-50 flex flex-col`}
      >
        {/* Close Button */}
        <button className="absolute top-6 right-4" onClick={toggleCart}>
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)] pr-2 border-slate-300 border-t-2">
              {cart.map((item) => {
                const imageUrl = item.image
                  ? urlFor(item.image).url()
                  : "/placeholder.png"; // Use placeholder if no image
                console.log("img: " + item.image);

                return (
                  <div key={item.slug} className="border-b border-slate-300 py-3">
                    <div className="flex items-center gap-4">
                      <Image
                        src={imageUrl}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md size-14"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold line-clamp-2">
                          {item.name}
                        </p>
                        <div className="flex w-full justify-between items-center mt-2">
                          <p className="text-gray-600">
                            ৳ {item.price.toFixed(2)}
                          </p>
                          <div className="flex gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center">
                              <button
                                onClick={() => decreaseQuantity(item.slug)}
                                className="border border-slate-300 w-8"
                              >
                                -
                              </button>
                              <span className="text-center border-y border-slate-300 min-w-10">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQuantity(item.slug)}
                                className="border border-slate-300 w-8"
                              >
                                +
                              </button>
                            </div>

                            {/* Delete */}
                            <button
                              onClick={() => removeFromCart(item.slug)}
                              className="text-red-500"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary (Fixed at Bottom) */}
            <div className="w-full bg-white border-t-2 border-slate-300">
              <div className="flex justify-between text-lg font-bold mt-3">
                <p>Subtotal:</p>
                <p>৳ {totalPrice.toFixed(2)}</p>
              </div>
              <div className="mt-4 space-y-2">
                <Link href="/cart">
                  <button
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-md text-center"
                    onClick={toggleCart}
                  >
                    View Cart
                  </button>
                </Link>

                {/* <Link href="/checkout">
                  <button
                    onClick={toggleCart}
                    className="w-full bg-indigo-600 text-white py-2 rounded-md text-center mt-3"
                  >
                    Checkout
                  </button>
                </Link> */}

                {/*  */}
                <div onClick={toggleCart}>
                  <CheckoutButton />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
