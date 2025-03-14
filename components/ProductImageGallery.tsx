"use client";

import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface SanityImage {
  asset: {
    _ref: string;
  };
}

interface Props {
  images: SanityImage[];
  productName: string;
}

const ProductImageGallery: React.FC<Props> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = urlFor(images[selectedIndex]?.asset?._ref)
    .width(300)
    .url();

  return (
    <div className="relative">
      {/* Main Image Display - Centered */}
      <div className="relative border rounded-xl p-2 mx-auto">
        <Image
          src={selectedImage}
          alt={productName}
          width={300}
          height={300}
          className="object-cover rounded-lg mx-auto h-60 lg:h-80"
        />
      </div>

      {/* Image Grid Thumbnails - Scrollable */}
      <div className="mt-4 overflow-x-auto ">
        <div className="flex gap-2">
          {images?.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="relative"
            >
              <Image
                src={urlFor(img.asset?._ref).width(80).url()}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className={` size-16 border rounded-md cursor-pointer transition-all duration-200 ${
                  selectedIndex === index ? "border-indigo-500" : "border-gray-300"
                }`}
              />
              {selectedIndex === index && (
                <div className="absolute inset-0 border-2 border-indigo-500 rounded-md"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
