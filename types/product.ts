  

export type Product = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  category: {
    name: string;
  };
  images: {
    asset: {
      _ref: string;
    };
    alt: string;
  }[];
  salePrice?: number;
  regularPrice?: number;
  stockQuantity?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  description?: string;
  _createdAt: string;
}