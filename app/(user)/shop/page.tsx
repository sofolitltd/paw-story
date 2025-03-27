import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { PRODUCT_QUERY } from "@/sanity/lib/product_queries";
import { urlFor } from "@/sanity/lib/image";
import AddToCart from "@/components/AddToCart";
import { Product } from "@/types/product";

// const products = [
//   {
//     id: 1,
//     title: "Purrfect Feast Cat Food (Chicken Flavor)",
//     image: "/images/cat-food.png",
//     price: 15.99,
//     category: "cat-food",
//     description:
//       "A delicious and nutritious dry food made with real chicken, providing essential proteins and nutrients for your cat's health.",
//     slug: "purrfect-feast-chicken", // Unique and URL-friendly
//   },
//   {
//     id: 2,
//     title: "Clumping Cat Litter (Lavender Scent)",
//     image: "/images/cat-litter.png",
//     price: 12.99,
//     category: "cat-litter",
//     description:
//       "Highly absorbent clumping litter with a refreshing lavender scent to control odors and make cleanup easy.",
//     slug: "clumping-litter-lavender",
//   },
//   {
//     id: 3,
//     title: "Stylish Cat Collar (Red)",
//     image: "/images/cat-collar.png",
//     price: 8.99,
//     category: "cat-collar",
//     description:
//       "A fashionable and comfortable cat collar made with durable materials, featuring a secure buckle and a stylish red design.",
//     slug: "stylish-cat-collar-red",
//   },
//   {
//     id: 4,
//     title: "Cozy Cat Bed (Plush Grey)",
//     image: "/images/cat-accessories.png",
//     price: 25.99,
//     category: "cat-accessories",
//     description:
//       "A super soft and plush cat bed in a calming grey color, providing the perfect spot for your cat to relax and sleep.",
//     slug: "cozy-cat-bed-grey",
//   },
//   {
//     id: 5,
//     title: "Ocean Delight Cat Food (Salmon Flavor)",
//     image: "/images/cat-food.png",
//     price: 15.99,
//     category: "cat-food",
//     description:
//       "A premium dry food made with real salmon, rich in omega fatty acids for a healthy coat and overall well-being.",
//     slug: "ocean-delight-salmon",
//   },
//   {
//     id: 6,
//     title: "Ultra Odor Control Cat Litter",
//     image: "/images/cat-litter.png",
//     price: 12.99,
//     category: "cat-litter",
//     description:
//       "A powerful odor-control cat litter designed to neutralize even the strongest smells, keeping your home fresh and clean.",
//     slug: "ultra-odor-control-litter",
//   },
//   {
//     id: 7,
//     title: "Adjustable Cat Collar (Blue)",
//     image: "/images/cat-collar.png",
//     price: 8.99,
//     category: "cat-collar",
//     description:
//       "A practical and adjustable cat collar in a vibrant blue color, ensuring a comfortable fit for your growing cat.",
//     slug: "adjustable-cat-collar-blue",
//   },
//   {
//     id: 8,
//     title: "Scratching Post (Cardboard)",
//     image: "/images/cat-accessories.png",
//     price: 25.99,
//     category: "cat-accessories",
//     description:
//       "A durable cardboard scratching post that helps your cat groom their claws and prevents them from scratching furniture.",
//     slug: "scratching-post-cardboard",
//   },
// ];

export default async function Shop() {
  // const { addToCart } = useCart();
  const products: Product[] = await client.fetch(PRODUCT_QUERY);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-6 py-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-lg border border-slate-300 group flex flex-col"
          >
            {/* Product Link */}
            <Link
              href={`/product/${product.slug.current}`}
              className="block flex-grow"
            >
              <div className="bg-slate-50 group-hover:bg-[#F6EEE4] transition-colors duration-300 rounded-tl-md rounded-tr-md overflow-hidden p-4">
                <Image
                  src={urlFor(product.images[0].asset._ref).url()}
                  alt={product.images[0]?.alt || product.name}
                  width={500}
                  height={500}
                  className="object-cover w-full h-60"
                />
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
                  {/* Favorite Icon */}
                  <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hidden group-hover:flex">
                    <Heart color="#ef4444" size={20} />
                  </div>
                </div>
              </div>
            </Link>

            <div className="mt-6">
              <AddToCart product={product} fullWidth={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
