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
      type: "object",
      fields: [
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "district", title: "District", type: "string" }),
      ],
    }),
  ],
});