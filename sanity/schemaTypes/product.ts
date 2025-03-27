import { defineField, defineType } from "sanity";

export const product = defineType({
    name: "product",
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            validation: Rule => Rule.required(),
            options: {
                source: 'name',
            }
        }),
        defineField({
            name: 'description',
            type: 'array',
            of: [
                {
                    type: 'block',
                }
            ],
            validation: Rule => Rule.required(),
        }),



        defineField({
            name: 'regularPrice',
            title: 'Regular Price',
            type: 'number',
            validation: Rule => Rule.min(0)
                .custom((regularPrice, context: any) => { 
                    const salePrice = context.document?.salePrice;

                    if (salePrice !== undefined && regularPrice !== undefined) {
                        if (typeof regularPrice === 'number' && typeof salePrice === 'number') {
                            if (regularPrice < salePrice) {
                                return 'Regular price must be greater than sale price';
                            }
                        }
                    }
                    return true;
                }),
        }),

        defineField({
            name: 'salePrice',
            title: 'Sale Price',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }),

        defineField({
            name: 'stockQuantity',
            title: 'Stock Quantity',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }),


        defineField({
            name: 'category',
            title: 'Product Category',
            type: 'reference',
            to: [{ type: 'product_category' }],
        }),

        defineField({
            name: 'images',
            title: 'Product Images',
            type: 'array',
            validation: Rule => Rule.required().min(1),
            options: {
                layout: 'grid',
            },
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            title: "Alternative Text",
                            name: "alt",
                            type: "string",
                        }
                    ]
                }
            ]
        }),

        defineField({
            name: 'isFeatured',
            title: 'Featured Product',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'isNew',
            title: 'New Product',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'isOnSale',
            title: 'On Sale',
            type: 'boolean',
            initialValue: false,
        }),

        defineField({
            name: 'isVisible',
            title: 'Visible',
            type: 'boolean',
            initialValue: true,
        }),


    ],
    preview: {
        select: {
            title: 'name',
            images: 'images',
            isFeatured: 'isFeatured',
            isNew: 'isNew',
            isOnSale: 'isOnSale',
            isVisible: 'isVisible',

        },
        prepare({ title, images, isFeatured, isNew, isOnSale, isVisible }) {
            const subtitle = [
                isFeatured ? 'Featured' : '',
                isNew ? 'New' : '',
                isOnSale ? 'On Sale' : '',
                isVisible ? '' : 'Hidden',
            ]
                .filter(Boolean)
                .join(' | ') || '';

            return {
                title,
                media: images?.[0] || null,
                subtitle,
            };
        },
    },

});
