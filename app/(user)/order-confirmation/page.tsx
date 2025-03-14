"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

    const orderData: Omit<OrderDetails, "orderNo" | "orderTime"> = {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 lg:py-20">
      {/* left dev */}
      <div className="justify-center item-center ">
        <h1 className="text-3xl font-extrabold text-start mb-4">
          Thank you for your
          <br /> Purchase!
        </h1>
        <p className="text-sm">
          Your order will be processed within 24 hours. <br />
          We will notify you soon.
        </p>

        {/* billing */}
        <div className=" mt-10">
          <h2 className="text-md font-semibold text-gray-800">
            Billing Information
          </h2>

          {/*  */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex ">
              <p className="w-20">Name:</p>
              <p>
                {orderDetails.formData.firstName}{" "}
                {orderDetails.formData.lastName}
              </p>
            </div>

            <div className="flex">
              <p className="w-20">Email:</p>
              <p>{orderDetails.formData.email}</p>
            </div>

            <div className="flex">
              <p className="w-20">Phone:</p>
              <p>{orderDetails.formData.mobile}</p>
            </div>

            <div className="flex">
              <p className="w-20">Address:</p>
              <p>
                {orderDetails.formData.street}, {orderDetails.formData.district}
              </p>
            </div>
          </div>

          {/*  */}
          <div className="flex gap-4 mt-6 ">
            <Link href="/profile">
              <div className="border rounded-md px-6 py-2 w-fit bg-red-500 text-white">
                Dashboard
              </div>
            </Link>

            <Link href="/">
              <div className="border rounded-md px-6 py-2 w-fit">
                Continue Shopping
              </div>
            </Link>
          </div>
        </div>
      </div>
 <div className="border rounded-xl shadow-md px-6 py-8 mt-6 lg:mt-0">
        <h2 className="text-xl font-semibold leading-tight">Order Summary</h2>

        {/*order info */}
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0 justify-between mt-4 border-t border-b border-dotted py-4 text-sm">
          {/* 1 */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Order Number</p>
            <p>{orderDetails.orderNo}</p>
          </div>

          {/* 2 */}
          <div className="">
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p>{orderDetails.orderTime}</p>
          </div>

          {/* 3 */}
          <div className="">
            <p className="text-sm text-gray-500 mb-1">Payment Method</p>
            <p>
              {orderDetails.paymentMethod === "cash"
                ? "Cash on Delivery"
                : "bKash"}
            </p>
          </div>
        </div>

        {/* cart  info*/}
        <div className=" space-y-4">
          {orderDetails.cart.map((item) => (
            <div
              key={item.slug}
              className="flex justify-between items-center py-4 border-b"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div className="text-sm">
                  <p className="">{item.title}</p>
                  <p className="text-gray-500">
                    ৳ {item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
              </div>
              <p className="text-md font-semibold text-gray-800">
                ৳ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* price info */}
        <div className="mt-4 space-y-2 ">
          <div className="flex justify-between text-gray-600">
            <p className="text-sm">Subtotal</p>
            <p>৳ {orderDetails.totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p className="text-sm">Shipping</p>
            <p>৳ 5.99</p>
          </div>
          <div className="flex justify-between text-gray-800  font-semibold text-md border-t pt-2">
            <p>Order Total</p>
            <p>৳ {orderDetails.grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
      {/*  right div*/}
     
    </div>
  );
};

export default ConfirmOrderPage;
