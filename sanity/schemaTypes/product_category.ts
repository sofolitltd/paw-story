import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const productCategory = defineType({
    name: "product_category",
    title: "Product Category",
    type: "document",
    icon: UserIcon,

    fields: [
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "name",
            },
        }),
        // Add description field
        defineField({
            name: "description",
            type: "text", 
            title: "Description", 
        }),
        // Add image field
        defineField({
            name: "image",
            type: "image",
            title: "Category Image",
            options: {
                hotspot: true, // Allows cropping in the Studio
            },
        }),
        // Add alt text for image
        defineField({
            name: "alt",
            type: "string",
            title: "Image Alt Text",
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image", // Display the image in the preview
        },
    },
});
