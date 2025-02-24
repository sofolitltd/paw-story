import { type SchemaTypeDefinition } from 'sanity';
import { category } from '@/sanity/schemaTypes/category';
import { posts } from '@/sanity/schemaTypes/posts';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [posts, category],
}
