// import { Metadata } from "next";
// import Image from "next/image";
// import { Heart } from "lucide-react";
// import Link from "next/link";
// import AddToCart from "@/components/AddToCart";

// // Mock category data
// const categories = [
//   {
//     id: 1,
//     name: "Cat Food",
//     image: "/images/cat-food.png",
//     slug: "cat-food",
//     description: "High-quality food for your cat.",
//   },
//   {
//     id: 2,
//     name: "Cat Litter",
//     image: "/images/cat-litter.png",
//     slug: "cat-litter",
//     description: "Effective and odor-control cat litter.",
//   },
//   {
//     id: 3,
//     name: "Cat Collar",
//     image: "/images/cat-collar.png",
//     slug: "cat-collar",
//     description: "Stylish and comfortable collars for your cat.",
//   },
//   {
//     id: 5,
//     name: "Cat Accessories",
//     image: "/images/cat-accessories.png",
//     slug: "cat-accessories",
//     description: "Essential accessories for your cat.",
//   },
// ];

// //
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

// //
// type Props = {
//   params: Promise<{ slug: string }>;
// };

// // Dynamic metadata for SEO
// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   const slug = (await params).slug;
//   const category = categories.find((cat) => cat.slug === slug);

//   return {
//     title: category ? category.name : "Category Not Found",
//     description: category ? category.description : "No description available",
//   };
// };

// // Dynamic details page
// export default async function ProductDetailsPage({ params }: Props) {
//   const slug = (await params).slug;
//   const category = categories.find((cat) => cat.slug === slug);

//   if (!category) {
//     return (
//       <div className="text-center text-xl p-8">Product Category Not Found!</div>
//     );
//   }

//   //
//   // Filter products by category
//   const filteredProducts = products.filter(
//     (product) => product.category === category.slug
//   );

//   return (
//     <div className="py-6">
//       {/*  */}
//       <div className="flex flex-col-2 items-center border rounded-lg  gap-4">
//         <Image
//           src={category.image}
//           alt={category.name}
//           width={100}
//           height={100}
//           className="object-contain p-2"
//         />

//         {/*  */}
//         <div className="">
//           <h1 className="text-2xl font-semibold ">{category.name}</h1>
//           <p className="text-lg text-gray-500">{category.description}</p>
//         </div>
//       </div>

//       {/*  */}

//       <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-6  py-12">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.slug}
//             className="relative bg-white rounded-lg  border group flex flex-col"
//           >
//             {/* Product Link */}
//             <Link href={`/product/${product.slug}`} className="block flex-grow">
//               {" "}
//               {/* Added flex-grow */}
//               <div className="bg-slate-50 group-hover:bg-[#F6EEE4] transition-colors duration-300 rounded-tl-md rounded-tr-md overflow-hidden p-4">
//                 {/* Added overflow-hidden */}
//                 <Image
//                   src={product.image}
//                   alt={product.title}
//                   width={200}
//                   height={200} // Reduced height
//                   className="object-cover w-full" // Changed to object-cover
//                 />
//               </div>
//               <div className="p-3">
//                 <h3 className="text-sm font-semibold line-clamp-2">
//                   {product.title}
//                 </h3>

//                 <div className="flex justify-between items-center mt-2">
//                   <p className="text-lg font-bold text-indigo-800">
//                    ৳{" "} {product.price}
//                   </p>

//                   <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hidden group-hover:flex">
//                     <Heart color="#ef4444" size={20} />
//                   </div>
//                 </div>
//               </div>
//             </Link>

//             {/* Add to Cart Link (Separated) */}
//             <AddToCart product={product}/>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

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
      <div className="flex flex-col-2 items-center border rounded-lg gap-4">
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
            className="relative bg-white rounded-lg border group flex flex-col"
          >
            {/* Product Link */}
            <Link
              href={`/product/${product.slug.current}`}
              className="block flex-grow"
            >
              <div className="bg-slate-50 group-hover:bg-[#F6EEE4] transition-colors duration-300 rounded-tl-md rounded-tr-md overflow-hidden p-4">
                <Image
                  src={urlFor(product.images[0]).url()} // Assuming the product has images
                  alt={product.images[0].alt}
                  width={200}
                  height={200}
                  className="object-cover w-full"
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
