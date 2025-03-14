import { type SchemaTypeDefinition } from 'sanity';
import { blog } from '@/sanity/schemaTypes/blog';
import { blogCategory } from '@/sanity/schemaTypes/blog_category';
import { product } from '@/sanity/schemaTypes/product';
import { productCategory } from './product_category';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ blogCategory, blog, productCategory, product],
}
