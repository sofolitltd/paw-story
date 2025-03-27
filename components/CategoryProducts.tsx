import { client } from "@/sanity/lib/client";
import { PRODUCTS_BY_CATEGORY_QUERY } from "@/sanity/lib/product_queries";
import { Product } from "@/types/product";
import ProductCarousel from "@/components/ProductCarousel"; 
import Link from "next/link";

const CategoryProducts = async ({ category }: { category: string }) => {
  const query = `${PRODUCTS_BY_CATEGORY_QUERY}[0...10]`;
  const products: Product[] = await client.fetch(query, {
    category,
  });

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className=" flex justify-between">
        <h2 className="text-2xl font-semibold">
          {category.replace("-", " ").toUpperCase()}
        </h2>

        <Link
          href={`/product-category/${category}`}
          className="hover:text-red-500"
        >
          View all
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col min-h-64 w-full  text-center justify-center items-center">
           <p className=" text-gray-500 ">
          No products found in this category.
        </p>
        </div>
       
      ) : (
        <ProductCarousel products={products} />
      )}
    </div>
  );
};

export default CategoryProducts;
