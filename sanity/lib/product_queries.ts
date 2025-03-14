import { defineQuery } from "next-sanity";

export const PRODUCT_QUERY = defineQuery(`*[_type == 'product' && defined(slug.current)] | order(_createdAt desc) {
    _id, 
    name, 
    slug,
    regularPrice,
    salePrice,
    category -> { name },
    images,
    _createdAt
}`)


export const SINGLE_PRODUCT_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    regularPrice,
    salePrice,
    category -> { name },
    images,
    description,
    _createdAt
}`)


export const CATEGORIES_QUERY = defineQuery(`*[_type == 'product_category'] {
    _id, 
    name,
    slug,
    description,
    image,
  }`);


export const CATEGORY_BY_SLUG = `*[_type == 'product_category' && slug.current == $slug][0]`;



export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && category->slug.current == $category]{
    _id,
    name,
    slug,
    regularPrice,
    salePrice,
    images,
    description,
    _createdAt
  } 
  | order(_createdAt desc)
  ${''}`;
