import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

//
const products = [
  {
    id: 1,
    title: "Purrfect Feast Cat Food (Chicken Flavor)",
    image: "/images/cat-food.png",
    price: "$15.99",
    category: "cat-food",
    description:
      "A delicious and nutritious dry food made with real chicken, providing essential proteins and nutrients for your cat's health.",
    slug: "purrfect-feast-chicken", // Unique and URL-friendly
  },
  {
    id: 2,
    title: "Clumping Cat Litter (Lavender Scent)",
    image: "/images/cat-litter.png",
    price: "$12.99",
    category: "cat-litter",
    description:
      "Highly absorbent clumping litter with a refreshing lavender scent to control odors and make cleanup easy.",
    slug: "clumping-litter-lavender",
  },
  {
    id: 3,
    title: "Stylish Cat Collar (Red)",
    image: "/images/cat-collar.png",
    price: "$8.99",
    category: "cat-collar",
    description:
      "A fashionable and comfortable cat collar made with durable materials, featuring a secure buckle and a stylish red design.",
    slug: "stylish-cat-collar-red",
  },
  {
    id: 4,
    title: "Cozy Cat Bed (Plush Grey)",
    image: "/images/cat-accessories.png",
    price: "$25.99",
    category: "cat-accessories",
    description:
      "A super soft and plush cat bed in a calming grey color, providing the perfect spot for your cat to relax and sleep.",
    slug: "cozy-cat-bed-grey",
  },
  {
    id: 5,
    title: "Ocean Delight Cat Food (Salmon Flavor)",
    image: "/images/cat-food.png",
    price: "$15.99",
    category: "cat-food",
    description:
      "A premium dry food made with real salmon, rich in omega fatty acids for a healthy coat and overall well-being.",
    slug: "ocean-delight-salmon",
  },
  {
    id: 6,
    title: "Ultra Odor Control Cat Litter",
    image: "/images/cat-litter.png",
    price: "$12.99",
    category: "cat-litter",
    description:
      "A powerful odor-control cat litter designed to neutralize even the strongest smells, keeping your home fresh and clean.",
    slug: "ultra-odor-control-litter",
  },
  {
    id: 7,
    title: "Adjustable Cat Collar (Blue)",
    image: "/images/cat-collar.png",
    price: "$8.99",
    category: "cat-collar",
    description:
      "A practical and adjustable cat collar in a vibrant blue color, ensuring a comfortable fit for your growing cat.",
    slug: "adjustable-cat-collar-blue",
  },
  {
    id: 8,
    title: "Scratching Post (Cardboard)",
    image: "/images/cat-accessories.png",
    price: "$25.99",
    category: "cat-accessories",
    description:
      "A durable cardboard scratching post that helps your cat groom their claws and prevents them from scratching furniture.",
    slug: "scratching-post-cardboard",
  },
];

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = (await params).slug;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      // For better social sharing
      title: product.title,
      description: product.description,
      images: [{ url: product.image }], // Add image URL if available
      type: "article", // Indicate this is an article
    },
    twitter: {
      // Twitter Card metadata
      card: "summary_large_image", // Or 'summary' if no large image
      title: product.title,
      description: product.description,
    },
  };
};

//
export default async function ProductDetails({ params }: Props) {
  const slug = (await params).slug;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="text-center text-xl p-8">Product Not Found!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <Image
        src={product.image}
        alt={product.title}
        height={400}
        width={400}
      ></Image>

      <div className="">
        <h1 className="text-lg font-bold mt-2 mb-2">{product.title}</h1>
        <p className="text-sm font-normal mb-4">{product.description}</p>

        <p className="text-lg font-bold mb-4">{product.price}</p>

        <p className="text-sm font-normal mb-6">
          Categorries: {product.category}
        </p>

        <Link href="/cart" className="block">
          <div
            className="flex gap-2 items-center justify-center rounded-md border border-red-500 py-2 px-8 cursor-pointer transition-all duration-300 text-red-500 hover:bg-red-500 hover:text-white w-fit"
          >
            <ShoppingCart size={20} />
            <p>Add to Cart</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
