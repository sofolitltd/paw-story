

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react"; // Assuming you have this component imported
import { client } from "@/sanity/lib/client";
import {
  CATEGORY_BY_SLUG,
  PRODUCTS_BY_CATEGORY_QUERY,
} from "@/sanity/lib/product_queries";
import AddToCart from "@/components/AddToCart";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/product";

type Props = {
  params: Promise<{ slug: string }>;
};

// Fetch category data from Sanity for metadata
export const generateMetadata = async ({ params }: Props) => {
  const slug = (await params).slug;

  // Fetch category by slug
  const category = await client.fetch(
    `*[_type == 'product_category' && slug.current == $slug][0]`,
    { slug }
  );

  return {
    title: category ? category.name : "Category Not Found",
    description: category ? category.description : "No description available",
  };
};

// Fetch categories and products dynamically inside the page component
export default async function ProductDetailsPage({ params }: Props) {
  const slug = (await params).slug;

  // Fetch category data by slug
  const category = await client.fetch(CATEGORY_BY_SLUG, { slug });

  if (!category) {
    return (
      <div className="text-center text-xl p-8">Product Category Not Found!</div>
    );
  }

  // Fetch products by category slug
  const filteredProducts: Product[] = await client.fetch(
    PRODUCTS_BY_CATEGORY_QUERY,
    {
      category: category.slug.current,
    }
  );

  return (
    <div className="py-6">
      <div className="flex flex-col-2 items-center border border-slate-300 rounded-lg gap-4">
        <Image
          src={urlFor(category.image).url()}
          alt={category.alt || category.name}
          width={100}
          height={100}
          className="object-contain p-2"
        />

        <div>
          <h1 className="text-2xl font-semibold">{category.name}</h1>
          <p className="text-lg text-gray-500">{category.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-6 py-12">
        {filteredProducts.map((product) => (
          <div
            key={`${product._id}-${product.slug}`} // Using _id + slug to ensure unique key
            className="relative bg-white rounded-lg border border-slate-300 group flex flex-col"
          >
            {/* Product Link */}
            <Link
              href={`/product/${product.slug.current}`}
              className="block flex-grow"
            >
              <div className="bg-slate-50 group-hover:bg-[#F6EEE4] transition-colors duration-300 rounded-tl-md rounded-tr-md overflow-hidden p-4">
                      <div className="relative w-full h-48">
                           {/* Ensure the image is centered and does not overflow */}
                           <Image
                             src={urlFor(product.images?.[0]?.asset?._ref).url()}
                             alt={product.images?.[0]?.alt || product.name}
                             layout="fill"
                             objectFit="contain" // Maintain aspect ratio
                             className="absolute inset-0 mx-auto my-auto"
                           />
                         </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-3 items-baseline">
                    <p className="text-lg font-bold text-indigo-800">
                      ৳ {product.salePrice}
                    </p>
                    <p className="text-base text-indigo-500 line-through">
                      ৳ {product.regularPrice}
                    </p>
                  </div>

                  <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hidden group-hover:flex">
                    <Heart color="#ef4444" size={20} />
                  </div>
                </div>
              </div>
            </Link>

            <AddToCart product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
