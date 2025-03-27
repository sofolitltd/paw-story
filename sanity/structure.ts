import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(
      [
        S.documentTypeListItem('blog_category').title('Blog Category'),
        S.documentTypeListItem('blog').title('Blog'),

        S.documentTypeListItem('product_category').title('Product Category'),
        S.documentTypeListItem('product').title('Product'),
        S.documentTypeListItem('user').title('User'),
        S.documentTypeListItem('order').title('Order'),
      ]
    )
