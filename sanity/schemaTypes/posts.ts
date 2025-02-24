import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const posts = defineType({
    name: "posts",
    title: 'Posts',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options:{
                source:'name',
            }
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'category',
            type: 'reference',
            to: {type: 'category'}
        }),
       
        defineField({
            name: 'image',
            type: 'string',
        }),

    ],
    preview:{
        select:{
            title: 'name',
        }
    }
})