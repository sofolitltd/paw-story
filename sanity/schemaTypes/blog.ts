// import { defineField, defineType } from "sanity";

// export const blog = defineType({
//     name: "blog",
//     title: 'Blog',
//     type: 'document',
//     fields: [
//         defineField({
//             name: 'name',
//             type: 'string',
//         }),
//         defineField({
//             name: 'slug',
//             type: 'slug',
//             options: {
//                 source: 'name',
//             }
//         }),
//         defineField({
//             name: 'description',
//             type: 'text',
//         }),
//         defineField({
//             name: 'category',
//             type: 'reference',
//             to: { type: 'blog_category' }
//         }),

//         defineField({
//             name: 'image',
//             type: 'image',
//             options: {
//                 hotspot: true,
//             },
//             fields: [
//                 {
//                     title: "Alternative Text",
//                     name: "alt",
//                     type: "string",
//                 },

//             ]
//         }),

//     ],
//     preview: {
//         select: {
//             title: 'name',
//             media: 'image',
//         }
//     }
// })


// import { defineField, defineType } from "sanity";

// export const blog = defineType({
//     name: "blog",
//     title: 'Blog',
//     type: 'document',
//     fields: [
//         defineField({
//             name: 'name',
//             title: 'Title',
//             type: 'string',
//             validation: (rule) => rule.required(),
//         }),
//         defineField({
//             name: 'slug',
//             title: 'Slug',
//             type: 'slug',
//             options: {
//                 source: 'name',
//             },
//             validation: (rule) => rule.required(),
//         }),
//         defineField({
//             name: 'description',
//             title: 'Content',
//             type: 'array',
//             of: [
//                 {
//                     type: 'block',
//                     // Styles let you define what blocks can be marked up as
//                     styles: [
//                         { title: 'Normal', value: 'normal' },
//                         { title: 'H1', value: 'h1' },
//                         { title: 'H2', value: 'h2' },
//                         { title: 'H3', value: 'h3' },
//                         { title: 'H4', value: 'h4' },
//                         { title: 'Quote', value: 'blockquote' },
//                     ],
//                     // Lists let you define what list types can be used
//                     lists: [
//                         { title: 'Bullet', value: 'bullet' },
//                         { title: 'Number', value: 'number' },
//                     ],
//                     // Marks let you mark up inline text in the Portable Text Editor
//                     marks: {
//                         // Decorators usually describe a single property – e.g. a typographic
//                         // preference or highlighting
//                         decorators: [
//                             { title: 'Strong', value: 'strong' },
//                             { title: 'Emphasis', value: 'em' },
//                             { title: 'Underline', value: 'underline' },
//                             { title: 'Strike', value: 'strike-through' },
//                         ],
//                         // Annotations can be any object
//                         annotations: [
//                             {
//                                 name: 'link',
//                                 type: 'object',
//                                 title: 'External link',
//                                 fields: [
//                                     {
//                                         name: 'href',
//                                         type: 'url',
//                                         title: 'URL',
//                                         validation: (rule) => rule.required(),
//                                     },
//                                     {
//                                         title: 'Open in new tab',
//                                         name: 'blank',
//                                         type: 'boolean',
//                                     },
//                                 ],
//                             },
//                             {
//                                 name: 'internalLink',
//                                 type: 'object',
//                                 title: 'Internal link',
//                                 fields: [
//                                     {
//                                         name: 'reference',
//                                         type: 'reference',
//                                         title: 'Reference',
//                                         to: [{ type: 'blog' }],
//                                     },
//                                 ],
//                             },
//                         ],
//                     },
//                 },
//                 // Custom blocks for images
//                 {
//                     type: 'image',
//                     name: 'contentImage',
//                     title: 'Image',
//                     options: {
//                         hotspot: true,
//                     },
//                     fields: [
//                         {
//                             name: 'alt',
//                             type: 'string',
//                             title: 'Alternative text',
//                             description: 'Important for SEO and accessibility.',
//                             validation: (rule) => rule.required(),
//                         },
//                         {
//                             name: 'caption',
//                             type: 'string',
//                             title: 'Caption',
//                             description: 'Optional caption for the image.',
//                         },
//                     ],
//                 },

//                 // Custom block for video embeds
//                 {
//                     type: 'object',
//                     name: 'videoEmbed',
//                     title: 'Video Embed',
//                     fields: [
//                         {
//                             name: 'url',
//                             type: 'url',
//                             title: 'Video URL',
//                             description: 'YouTube, Vimeo, or other video URL',
//                             validation: (rule) => rule.required(),
//                         },
//                         {
//                             name: 'title',
//                             type: 'string',
//                             title: 'Video Title',
//                         },
//                     ],
//                     preview: {
//                         select: {
//                             title: 'title',
//                             url: 'url',
//                         },
//                         prepare({ title, url }) {
//                             return {
//                                 title: title || 'Video Embed',
//                                 subtitle: url,
//                             };
//                         },
//                     },
//                 },
//             ],
//         }),
//         defineField({
//             name: 'category',
//             title: 'Category',
//             type: 'reference',
//             to: { type: 'blog_category' },
//             validation: (rule) => rule.required(),
//         }),
//         defineField({
//             name: 'image',
//             title: 'Featured Image',
//             type: 'image',
//             options: {
//                 hotspot: true,
//             },
//             fields: [
//                 {
//                     title: "Alternative Text",
//                     name: "alt",
//                     type: "string",
//                     validation: (rule) => rule.required(),
//                 },
//             ],
//             validation: (rule) => rule.required(),
//         }),
//         defineField({
//             name: 'publishedAt',
//             title: 'Published At',
//             type: 'datetime',
//             initialValue: () => new Date().toISOString(),
//         }),
//         // defineField({
//         //     name: 'author',
//         //     title: 'Author',
//         //     type: 'reference',
//         //     to: { type: 'author' }, // You might need to create an author schema
//         // }),
//         defineField({
//             name: 'tags',
//             title: 'Tags',
//             type: 'array',
//             of: [{ type: 'string' }],
//             options: {
//                 layout: 'tags',
//             },
//         }),
//         defineField({
//             name: 'seo',
//             title: 'SEO',
//             type: 'object',
//             fields: [
//                 {
//                     name: 'metaTitle',
//                     title: 'Meta Title',
//                     type: 'string',
//                     validation: (rule) => rule.max(60),
//                 },
//                 {
//                     name: 'metaDescription',
//                     title: 'Meta Description',
//                     type: 'text',
//                     validation: (rule) => rule.max(160),
//                 },
//             ],
//             options: {
//                 collapsible: true,
//                 collapsed: true,
//             },
//         }),
//     ],
//     preview: {
//         select: {
//             title: 'name',
//             media: 'image',
//             category: 'category.name',
//             publishedAt: 'publishedAt',
//         },
//         prepare({ title, media, category, publishedAt }) {
//             return {
//                 title: title,
//                 subtitle: `${category || 'Uncategorized'} • ${
//                     publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft'
//                 }`,
//                 media: media,
//             };
//         },
//     },
// });


import { defineField, defineType } from "sanity";

export const blog = defineType({
    name: "blog",
    title: 'Blog',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    // Enable soft line breaks
                    options: {
                        spellCheck: true,
                        // This allows line breaks within blocks
                        lineBreaks: true,
                    },
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Number', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                            { title: 'Underline', value: 'underline' },
                            { title: 'Strike', value: 'strike-through' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'External link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: (rule) =>
                                            rule.uri({
                                                scheme: ['http', 'https', 'mailto', 'tel'], // allow tel
                                            }).required(),
                                    },
                                    {
                                        title: 'Open in new tab',
                                        name: 'blank',
                                        type: 'boolean',
                                    },
                                ],
                            },
                            {
                                name: 'internalLink',
                                type: 'object',
                                title: 'Internal link',
                                fields: [
                                    {
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Reference',
                                        to: [{ type: 'blog' }],
                                    },
                                ],
                            },
                        ],
                    },
                },
                // Add a line break block
                {
                    type: 'object',
                    name: 'lineBreak',
                    title: 'Line Break',
                    fields: [
                        {
                            name: 'style',
                            type: 'string',
                            title: 'Break Style',
                            options: {
                                list: [
                                    { title: 'Single Line Break', value: 'single' },
                                    { title: 'Double Line Break', value: 'double' },
                                    { title: 'Custom Spacing', value: 'custom' },
                                ]
                            },
                            initialValue: 'single'
                        },
                        {
                            name: 'customHeight',
                            type: 'number',
                            title: 'Custom Height (in rem)',
                            hidden: ({ parent }) => parent?.style !== 'custom',
                            validation: (rule) => rule.min(0).max(10)
                        }
                    ],
                    preview: {
                        select: {
                            style: 'style',
                            customHeight: 'customHeight'
                        },
                        prepare({ style, customHeight }) {
                            const titles = {
                                single: '↵ Single Break',
                                double: '↵↵ Double Break',
                                custom: `↵ Custom Break (${customHeight}rem)`
                            };
                            return {
                                title: titles[style as keyof typeof titles] || '↵ Line Break',
                            };
                        },
                    },
                },
                // Custom blocks for images
                {
                    type: 'image',
                    name: 'contentImage',
                    title: 'Image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            description: 'Important for SEO and accessibility.',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                            description: 'Optional caption for the image.',
                        },
                    ],
                },

                // Custom block for video embeds
                {
                    type: 'object',
                    name: 'videoEmbed',
                    title: 'Video Embed',
                    fields: [
                        {
                            name: 'url',
                            type: 'url',
                            title: 'Video URL',
                            description: 'YouTube, Vimeo, or other video URL',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Video Title',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            url: 'url',
                        },
                        prepare({ title, url }) {
                            return {
                                title: title || 'Video Embed',
                                subtitle: url,
                            };
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: { type: 'blog_category' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    title: "Alternative Text",
                    name: "alt",
                    type: "string",
                    validation: (rule) => rule.required(),
                },
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),

        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    validation: (rule) => rule.max(60),
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    validation: (rule) => rule.max(160),
                },
            ],
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            category: 'category.name',
            publishedAt: 'publishedAt',
        },
        prepare({ title, media, category, publishedAt }) {
            return {
                title: title,
                subtitle: `${category || 'Uncategorized'} • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft'
                    }`,
                media: media,
            };
        },
    },
});