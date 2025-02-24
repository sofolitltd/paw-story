import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(`*[_type == 'posts' && defined(slug.current) ] | order(_createdAt desc){
    _id, 
    name, 
    slug,
    description,
    category ->{name},
    image,
    _createdAt
    }`)


    export const SINGLE_QUERY = defineQuery(`*[_type == "posts" && slug.current == $slug][0] {
        _id,
        name,
        slug -> ,
        category ->{name},
        description,
        image,
        _createdAt,
      }`)