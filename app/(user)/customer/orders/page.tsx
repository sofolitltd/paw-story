// pages/orders.tsx
"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; 
import { useUser } from "@clerk/nextjs"; 
import { Order } from "@/types/order";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrdersPage = () => {
  const { user } = useUser(); // Get current logged-in clerk user
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        // Fetch orders where the userID matches the logged-in clerk's userID
        const data = await client.fetch<Order[]>(
          `*[_type == "order" && userID == $userID] | order(orderId asc)`,
          { userID: user.id }
        );
        setOrders(data);
      }
    };
    fetchOrders();
  }, [user]);



 
  
  const handleDownloadInvoice = (order: Order) => {
    const doc = new jsPDF();
  
    // Invoice Header
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);
  
    // Order Details
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.orderId}`, 14, 30);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 14, 40);
    doc.text(`Customer Name: ${order.customerName}`, 14, 50);
    doc.text(`Email: ${order.email}`, 14, 60);
    doc.text(`Phone: ${order.phone}`, 14, 70);
  
    // Order Table
    autoTable(doc, {
      startY: 80,
      head: [["Item", "Quantity", "Price", "Total"]],
      body: order.items.map((item: { name: string; quantity: number; price: number; }) => [
        item.name,
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${(item.quantity * item.price).toFixed(2)}`,
      ]),
    });
  
    // Get the final Y position after the table
    const finalY = doc.lastAutoTable?.finalY ?? 90; // Properly typed, no `any` usage
  
    // Total Amount
    doc.text(`Total: $${order.total.toFixed(2)}`, 14, finalY + 10);
  
    // Save and Download
    doc.save(`Invoice_${order.orderId}.pdf`);
  };
  

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Invoice</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td className="border p-2">{order.orderId}</td>
              <td className="border p-2">
                {format(new Date(order.date), "dd/mm/yy")}
              </td>
              <td className="border p-2">{order.customerName}</td>
              <td className="border p-2">{order.email}</td>
              <td className="border p-2">{order.phone}</td>
              <td className="border p-2">{order.total}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                {
                  <button
                    onClick={() => handleDownloadInvoice(order)}
                    className="text-blue-500"
                  >
                    Download
                  </button>
                }
              </td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
