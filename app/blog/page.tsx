import React from "react";
import Blogs from "@/components/Blogs";
// 
const posts = [
    {
      id: 1,
      title: "The Ultimate Guide to Choosing the Best Cat Food",
      image: "/images/cat-food.png",
      slug: "ultimate-guide-cat-food",
      excerpt: "Discover the best cat food for your feline friend, including nutrition tips and brand recommendations.",
      content: "A detailed guide on how to choose the best cat food based on ingredients, cat age, and health conditions.",
      category: "Cat Food",
      publishedAt: "2024-02-21",
    },
    {
      id: 2,
      title: "How to Keep Your Home Smelling Fresh with the Right Cat Litter",
      image: "/images/cat-litter.png",
      slug: "keep-home-smelling-fresh",
      excerpt: "Learn how to choose the best cat litter to control odors and keep your home fresh.",
      content: "This post covers different types of cat litter, their benefits, and tips for maintaining a clean litter box.",
      category: "Cat Litter",
      publishedAt: "2024-02-19",
    },
    {
      id: 3,
      title: "Why Your Cat Needs a Stylish and Comfortable Collar",
      image: "/images/cat-collar.png",
      slug: "why-cat-needs-collar",
      excerpt: "Explore the benefits of cat collars and how to choose the perfect one for your pet.",
      content: "Discussing safety, design, and comfort aspects of cat collars and how they can benefit your furry friend.",
      category: "Cat Collar",
      publishedAt: "2024-02-18",
    },
    {
      id: 4,
      title: "10 Must-Have Accessories for Your Cat",
      image: "/images/cat-accessories.png",
      slug: "must-have-cat-accessories",
      excerpt: "From scratching posts to cozy beds, here are the top 10 accessories your cat will love!",
      content: "A curated list of essential accessories that enhance your cat’s lifestyle and well-being.",
      category: "Cat Accessories",
      publishedAt: "2024-02-15",
    },
    {
      id: 5,
      title: "Understanding Your Cat’s Diet: Wet vs. Dry Food",
      image: "/images/cat-accessories.png",
      slug: "cat-diet-wet-vs-dry",
      excerpt: "A comprehensive comparison between wet and dry cat food to help you make the best choice.",
      content: "Discussing the pros and cons of wet and dry cat food and how to balance them in your cat’s diet.",
      category: "Cat Food",
      publishedAt: "2024-02-10",
    },
    {
      id: 6,
      title: "How Often Should You Change Your Cat’s Litter?",
      image: "/images/cat-accessories.png",
      slug: "how-often-change-litter",
      excerpt: "Learn the best practices for keeping your cat's litter box clean and odor-free.",
      content: "Tips on maintaining hygiene, how frequently to change litter, and signs that it's time for a change.",
      category: "Cat Litter",
      publishedAt: "2024-02-07",
    },
    {
      id: 7,
      title: "DIY Cat Toys: Fun and Affordable Ideas",
      image: "/images/cat-accessories.png",
      slug: "diy-cat-toys",
      excerpt: "Create exciting DIY toys to keep your cat entertained and active!",
      content: "Step-by-step guides for making homemade cat toys using simple household items.",
      category: "Cat Accessories",
      publishedAt: "2024-02-05",
    },
    {
      id: 8,
      title: "Top 5 Signs Your Cat Needs a New Collar",
      image: "/images/cat-accessories.png",
      slug: "signs-cat-needs-new-collar",
      excerpt: "Is your cat’s collar worn out? Here are the top signs it’s time for a replacement.",
      content: "Explaining the signs of an old collar and how to pick a new one for your cat's comfort and safety.",
      category: "Cat Collar",
      publishedAt: "2024-02-02",
    },
    {
      id: 9,
      title: "The Best Cat Beds for Ultimate Comfort",
      image: "/images/cat-accessories.png",
      slug: "best-cat-beds",
      excerpt: "Give your cat the comfort they deserve with these top-rated cat beds.",
      content: "A guide to choosing the right cat bed based on materials, size, and cat preferences.",
      category: "Cat Accessories",
      publishedAt: "2024-01-30",
    },
    {
      id: 10,
      title: "How to Transition Your Cat to a New Food Brand",
      image: "/images/cat-accessories.png",
      slug: "cat-food-transition",
      excerpt: "Switching your cat’s food? Follow these steps to make the transition smooth and stress-free.",
      content: "Practical tips on how to gradually introduce a new food brand to your cat without digestive issues.",
      category: "Cat Food",
      publishedAt: "2024-01-25",
    },
  ];
  
export default function Blog() {
  return (
    <div>
      <Blogs posts={posts} />
    </div>
  );
}
