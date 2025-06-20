import { defineQuery } from "next-sanity";

export const BLOG_QUERY = defineQuery(`*[_type == 'blog' && defined(slug.current) ] | order(_createdAt desc){
    _id, 
    name, 
    slug,
    description,
    category ->{name},
    image,
    _createdAt
    }`)


    export const SINGLE_BLOG_QUERY = defineQuery(`*[_type == "blog" && slug.current == $slug][0] {
        _id,
        name,
        slug -> ,
        category ->{name},
        description,
        image,
        _createdAt,
      }`)


  