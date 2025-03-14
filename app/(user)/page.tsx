import FeaturedCategory from "@/components/FeaturedCategories";
import ImageSlider from "@/components/ImageSlider";
import Blogs from "@/components/Blogs";
import React from "react";
import CategoryProducts from "@/components/CategoryProducts";

// //
// const categories = [
//   {
//     id: 1,
//     name: "Cat Food",
//     image: "/images/cat-food.png",
//     slug: "cat-food",
//   },
//   {
//     id: 2,
//     name: "Cat Litter",
//     image: "/images/cat-litter.png",
//     slug: "cat-litter",
//   },
//   {
//     id: 3,
//     name: "Cat Collar",
//     image: "/images/cat-collar.png",
//     slug: "cat-collar",
//   },
//   {
//     id: 5,
//     name: "Cat Accessories",
//     image: "/images/cat-accessories.png",
//     slug: "cat-accessories",
//   },
// ];

//
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

export default function Home() {
  return (
    <div className=" mt-4 ">
      {/* slider section */}
      <ImageSlider />

      {/* featured categories */}
      <FeaturedCategory />

      {/*  */}
      {/* <FeaturedProducts products={products} /> */}

      {/* cat food */}
      <CategoryProducts category="cat-food" />

      {/* cat litter */}
      <CategoryProducts category="cat-litter" />

      {/*  */}
      <Blogs limit={3} />
    </div>
  );
}
