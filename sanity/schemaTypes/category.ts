import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const category = defineType({
    name: "category",
    title: 'Category',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'id',
            type: 'number',
        }),
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options:{
                source: 'name'
            }
        }),
    ],
    preview:{
        select:{
            title: 'name',
        }
    }
})