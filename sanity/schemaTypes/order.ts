import { defineType, defineField } from "sanity";

export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "orderID",
      title: "Order ID",
      type: "string",
    }),
    defineField({
      name: "userID",
      title: "User ID",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Customer Name",
      type: "string",
    }),
    defineField({
      name: "total",
      title: "Total Amount",
      type: "number",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "Pending" },
          { title: "Processing", value: "Processing" },
          { title: "Shipped", value: "Shipped" },
          { title: "Delivered", value: "Delivered" },
          { title: "Cancelled", value: "Cancelled" },
        ],
      },
    }),
    defineField({
      name: "invoiceID",
      title: "Invoice ID",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Order Date",
      type: "datetime",
    }),
    defineField({
      name: "address",
      title: "Shipping Address",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name", // Display customer name as the main title
      subtitle: "date", // Display order date as the subtitle
      status: "status", // Display order status as part of the preview
      userID: "userID", // Display user ID as part of the preview
    },
    prepare(selection) {
      const { title, subtitle, status, userID } = selection;
      return {
        title: `${userID} - ${title}`, // Show "User ID - Customer Name" as title
        subtitle: `${new Date(subtitle).toLocaleDateString()} | Status: ${status}`, // Format the date and display status
      };
    },
  },
});
