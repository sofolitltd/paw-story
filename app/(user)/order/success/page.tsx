"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OrderSuccessPage = () => {
  const params = useSearchParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orderData = params.get("order");
    if (orderData) {
      try {
        setOrder(JSON.parse(orderData));
      } catch (e) {
        console.error("Failed to parse order:", e);
      }
    }
  }, [params]);

  if (!order) return <div>Loading order details...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎉 Order Placed Successfully!</h1>

      <p className="mb-2">Order ID: <strong>{order.orderID}</strong></p>
      <p className="mb-2">Invoice ID: <strong>{order.invoiceID}</strong></p>
      <p className="mb-2">Name: {order.name}</p>
      <p className="mb-2">Total: ৳{order.total}</p>
      <p className="mb-2">Status: {order.status}</p>
      <p className="mb-2">Date: {order.date}</p>
      <p className="mb-2">Address: {order.address}</p>

      <div className="mt-4">
        <h2 className="text-md font-semibold">Ordered Products:</h2>
        <ul className="list-disc list-inside">
          {order.products.map((prod: any) => (
            <li key={prod._key}>Product Ref ID: {prod._ref}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
