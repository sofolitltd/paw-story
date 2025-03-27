import { type SchemaTypeDefinition } from 'sanity';
import { blog } from '@/sanity/schemaTypes/blog';
import { blogCategory } from '@/sanity/schemaTypes/blog_category';
import { user } from '@/sanity/schemaTypes/user';
import { product } from '@/sanity/schemaTypes/product';
import { productCategory } from './product_category';
import { order } from '@/sanity/schemaTypes/order';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ blogCategory, blog, productCategory, product, user,order],
}
