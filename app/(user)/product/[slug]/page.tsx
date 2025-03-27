

import React from "react";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import {
  SINGLE_PRODUCT_QUERY,
} from "@/sanity/lib/product_queries";
import AddToCart from "@/components/AddToCart";
import ProductImageGallery from "@/components/ProductImageGallery"; 
import { Product } from "@/types/product";
import { PortableText } from "@portabletext/react";




// // Generate metadata dynamically
export const generateMetadata = async ({
  params,
}:  {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  
  const slug = (await params).slug;
  const product : Product =  await client.fetch(SINGLE_PRODUCT_QUERY, { slug });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description || "Check out this amazing product!",
  };
};

// Product Details Page
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product : Product =  await client.fetch(SINGLE_PRODUCT_QUERY, { slug });


  if (!product) {
    return <div className="text-center text-xl p-8">Product Not Found!</div>;
  }

  const renderDescription = () => {
    if (Array.isArray(product.description) || typeof product.description === "object") {
      // If it's rich text (array or object), use PortableText
      return <PortableText value={product.description} />;
    }
    // Otherwise, render it as plain text
    return product.description || "No description available.";
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-10">
        {/* Product Image Gallery Component */}
        <div className="md:col-span-3"> {/* Make image section 3/7 on large screens */}
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* Product Details */}
        <div className="md:col-span-4"> {/* Make content section 4/7 on large screens */}
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-semibold text-indigo-600 mt-2">
            ৳ {product.salePrice}
          </p>

         
          <p className="text-sm text-gray-500 mt-6">
            Category: {product.category?.name || "Unknown"}
          </p>
   
          <div className="mt-6">
            <AddToCart product={product} fullWidth={false} />
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mt-12">
        {/* <FeaturesProducts query={FEATURED_PRODUCTS_QUERY} /> */}
      </div>


      <p className=" border-b border-slate-300 py-2">Description</p>
      <div className="text-gray-700 mt-5">{renderDescription()}</div>

    </div>
  );
}
