import { Metadata } from "next";
import Image from "next/image";
import { Heart, ShoppingBag } from "iconsax-react";

// Mock category data
const categories = [
  {
    id: 1,
    name: "Cat Food",
    image: "/images/cat-food.png",
    slug: "cat-food",
    description: "High-quality food for your cat.",
  },
  {
    id: 2,
    name: "Cat Litter",
    image: "/images/cat-litter.png",
    slug: "cat-litter",
    description: "Effective and odor-control cat litter.",
  },
  {
    id: 3,
    name: "Cat Collar",
    image: "/images/cat-collar.png",
    slug: "cat-collar",
    description: "Stylish and comfortable collars for your cat.",
  },
  {
    id: 5,
    name: "Cat Accessories",
    image: "/images/cat-accessories.png",
    slug: "cat-accessories",
    description: "Essential accessories for your cat.",
  },
];

//
const products = [
  {
    id: 1,
    name: "Cat Food",
    image: "/images/cat-food.png",
    price: "$15.99",
    category: "cat-food",
  },
  {
    id: 2,
    name: "Cat Litter",
    image: "/images/cat-litter.png",
    price: "$12.99",
    category: "cat-litter",
  },
  {
    id: 3,
    name: "Cat Collar",
    image: "/images/cat-collar.png",
    price: "$8.99",
    category: "cat-collar",
  },
  {
    id: 4,
    name: "Cat Bed",
    image: "/images/cat-accessories.png",
    price: "$25.99",
    category: "cat-accessories",
  },
  {
    id: 5,
    name: "Cat Food",
    image: "/images/cat-food.png",
    price: "$15.99",
    category: "cat-food",
  },
  {
    id: 6,
    name: "Cat Litter",
    image: "/images/cat-litter.png",
    price: "$12.99",
    category: "cat-litter",
  },
  {
    id: 7,
    name: "Cat Collar",
    image: "/images/cat-collar.png",
    price: "$8.99",
    category: "cat-collar",
  },
  {
    id: 8,
    name: "Cat Bed",
    image: "/images/cat-accessories.png",
    price: "$25.99",
    category: "cat-accessories",
  },
];

//
type Props = {
  params: Promise<{ slug: string }>;
};

// Dynamic metadata for SEO
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = (await params).slug;
  const category = categories.find((cat) => cat.slug === slug);

  return {
    title: category ? category.name : "Category Not Found",
    description: category ? category.description : "No description available",
  };
};

// Dynamic details page
export default async function ProductDetailsPage({ params }: Props) {
  const slug = (await params).slug;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return (
      <div className="text-center text-xl p-8">Product Category Not Found!</div>
    );
  }

  //
  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category === category.slug
  );

  return (
    <div className="py-6">
      {/*  */}
      <div className="flex flex-col-2 items-center border rounded-lg  gap-4">
        <Image
          src={category.image}
          alt={category.name}
          width={100}
          height={100}
          className="object-contain p-2"
        />

        {/*  */}
        <div className="">
          <h1 className="text-2xl font-semibold ">{category.name}</h1>
          <p className="text-lg text-gray-500">{category.description}</p>
        </div>
      </div>

      {/*  */}

      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative  bg-white p-4 rounded-lg shadow-md snap-start transition-transform hover:shadow-md hover:-translate-y-1.5  border "
          >
            {/* Heart Icon Positioned Top Right */}
            <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md">
              <Heart color="#ef4444" size={20} />
            </div>

            {/* Product Image */}
            <Image
              src={product.image}
              alt={product.name}
              width={260}
              height={260}
              className="object-contain w-full  rounded-lg"
            />

            {/* Product Name */}
            <h3 className="text-md font-semibold mt-2">{product.name}</h3>

            {/* Price and Cart Button */}
            <div className="flex justify-between items-center mt-2">
              <p className="text-xl font-bold text-indigo-800">
                {product.price}
              </p>
              <div className="rounded-full border p-2 cursor-pointer hover:bg-gray-100">
                <ShoppingBag color="#000" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
