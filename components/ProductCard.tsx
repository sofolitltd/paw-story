import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import AddToCart from "@/components/AddToCart";
import { urlFor } from "@/sanity/lib/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative bg-white rounded-lg border border-slate-300 group flex flex-col h-full w-[240px]">
      {" "}
      {/* Fixed width here */}
      <Link
        href={`/product/${product.slug.current}`}
        className="block flex-grow"
      >
        <div className="overflow-hidden rounded-md bg-slate-50 group-hover:bg-[#F6EEE4] transition-colors duration-300 p-4">
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

        <div className="p-3 flex-grow">
          <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>

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
      <div className="mt-auto">
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
