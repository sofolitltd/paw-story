"use client";

import Link from "next/link";

const OrderSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is now being processed.</p>

      <div className="flex gap-4">
        <Link href="/">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Home</button>
        </Link>
        <Link href="/shop">
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
