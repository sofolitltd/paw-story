// app/featured-categories/page.tsx (or any other route in the app directory)

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; // Path to your sanity client
import { CATEGORIES_QUERY } from "@/sanity/lib/product_queries"; // Path to your Sanity query
import { urlFor } from "@/sanity/lib/image"; // Sanity image URL builder

// Type definition for category
type Category = {
  _id: string;
  name: string;
   slug: {
    current: string; 
  };
  description: string;
  image: {
    alt?: string;
  };
};

// Fetch categories directly inside the component (React Server Component)
const FeaturedCategories = async () => {
  // Fetch the categories from Sanity
  const categories: Category[] = await client.fetch(CATEGORIES_QUERY);

  return (
    <div className="container mx-auto py-4 my-8">
      <h2 className="text-md text-center font-medium mb-1 text-gray-400">
        PAW STORY EXCLUSIVE
      </h2>
      <h2 className="text-2xl text-center font-semibold mb-8">
        FEATURED CATEGORIES
      </h2>

      <div className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory">
        {categories.map((category) => (
          <Link
            key={category._id} // Use _id for unique keys
            href={`/product-category/${category.slug.current}`} // Correct route
            className="shrink-0 snap-start"
          >
            <div className="size-64 bg-white p-4 rounded-lg  hover:shadow-lg transition border border-slate-300 mb-4 relative flex flex-col items-center justify-center">
              <Image
                src={urlFor(category.image).url()} 
                alt={category.image.alt || category.name} 
                width={125}
                height={125}
                className="object-contain rounded-lg"
              />
              <h3 className="text-center text-2xl font-bold transition mt-2">
                {category.name.toUpperCase()}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;

