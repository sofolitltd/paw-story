"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type FormData = {
  firstName: string | null;
  lastName: string | null;
  mobile: string | null;
  email: string | null;
  street: string | null;
  district: string | null;
  notes: string | null;
};

type CartItem = {
  slug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

type OrderDetails = {
  formData: FormData;
  cart: CartItem[];
  totalPrice: number;
  grandTotal: number;
  paymentMethod: string | null;
  orderNo: string;
  orderTime: string;
};


const ConfirmOrderPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Extract query parameters and parse them
    const params = new URLSearchParams(window.location.search);

    // Get cart data and parse it safely
    const cartData = params.get("cart");
    let parsedCart: CartItem[] = [];
    try {
      if (cartData) {
        parsedCart = JSON.parse(cartData);
      }
    } catch (error) {
      console.error("Error parsing cart data:", error);
    }

    const orderData: Omit<OrderDetails, 'orderNo' | 'orderTime'> = {
      formData: {
        firstName: params.get("firstName"),
        lastName: params.get("lastName"),
        mobile: params.get("mobile"),
        email: params.get("email"),
        street: params.get("street"),
        district: params.get("district"),
        notes: params.get("notes"),
      },
      cart: parsedCart,
      totalPrice: parseFloat(params.get("totalPrice") || "0"),
      grandTotal: parseFloat(params.get("grandTotal") || "0"),
      paymentMethod: params.get("paymentMethod"),
    };

    // Generate order number and timestamp
    const orderNo = `ORD-${Math.floor(Math.random() * 1000000)}`;
    const orderTime = new Date().toLocaleString();

    setOrderDetails({ ...orderData, orderNo, orderTime });
  }, []);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-12 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          Order Confirmation
        </h1>

        {/* Order Details Card */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-indigo-700">Order Information</h2>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-indigo-600">
                <strong>Order No:</strong> {orderDetails.orderNo}
              </p>
              <p className="text-indigo-600">
                <strong>Order Time:</strong> {orderDetails.orderTime}
              </p>
            </div>
            <div>
              <span className="text-green-600 font-semibold text-lg">Status: Confirmed</span>
            </div>
          </div>
        </div>

        {/* Billing Information Card */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Billing Information</h2>
          <div className="mt-4 space-y-3">
            <p><strong>Name:</strong> {orderDetails.formData.firstName} {orderDetails.formData.lastName}</p>
            <p><strong>Email:</strong> {orderDetails.formData.email}</p>
            <p><strong>Phone:</strong> {orderDetails.formData.mobile}</p>
            <p><strong>Address:</strong> {orderDetails.formData.street}, {orderDetails.formData.district}</p>
            {orderDetails.formData.notes && (
              <p><strong>Notes:</strong> {orderDetails.formData.notes}</p>
            )}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
          <div className="mt-4 space-y-4">
            {orderDetails.cart.map((item) => (
              <div key={item.slug} className="flex justify-between items-center py-4 border-b">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-500">৳ {item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-800">৳ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Payment Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Pricing & Payment</h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <p>Total Price</p>
              <p>৳ {orderDetails.totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Shipping Charge</p>
              <p>৳ 5.99</p>
            </div>
            <div className="flex justify-between text-gray-800 font-semibold text-lg border-t pt-2">
              <p>Grand Total</p>
              <p>৳ {orderDetails.grandTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Payment Method</h2>
          <p className="mt-4 text-gray-600">
            {orderDetails.paymentMethod === "cash" ? "Cash on Delivery" : "bKash"}
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;
