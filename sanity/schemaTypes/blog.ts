import { defineField, defineType } from "sanity";

export const blog = defineType({
    name: "blog",
    title: 'Blog',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
            }
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'category',
            type: 'reference',
            to: { type: 'blog_category' }
        }),

        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    title: "Alternative Text",
                    name: "alt",
                    type: "string",
                },

            ]
        }),

    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        }
    }
})