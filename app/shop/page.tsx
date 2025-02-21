import React from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "iconsax-react";

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

export default function Shop() {
  return (
    <div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
        {products.map((product) => (
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
