import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface FeaturedCategoryProps {
  categories: Category[];
}

const FeaturedCategory: React.FC<FeaturedCategoryProps> = ({ categories }) => {
  return (
    <div className="container mx-auto py-4 my-8">
      <h2 className="text-md text-center font-medium mb-1 text-gray-400">PAW STORY EXCLUSIVE</h2>
      <h2 className="text-2xl text-center font-semibold mb-8">FEATURED CATEGORIES</h2>

      <div className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/product-category/${category.slug}`} // ✅ Correct route
            className="shrink-0 snap-start"
          >
            <div className="size-48 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border mb-4 relative flex flex-col items-center justify-center">
              <Image
                src={category.image}
                alt={category.name}
                width={125}
                height={125}
                className="object-contain rounded-lg"
              />
              <h3 className="text-center font-bold transition mt-2">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategory;
