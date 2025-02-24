import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";

interface BlogPost {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  image: string;
  category: {name: string};
  _createdAt: string;
}

interface BlogsProps {
  limit?: number;
}

const Blogs: React.FC<BlogsProps> = async ({ limit }) => {
    const posts = await client.fetch(POST_QUERY);
  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="mt-8">
      <h2 className="text-md text-center font-medium mb-1 text-gray-400">
        STAY WITH US
      </h2>
      <h2 className="text-2xl text-center font-semibold mb-8">
        OUR LATEST NEWS 
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {displayedPosts.map((post:BlogPost) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`} className="group">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border mb-4 relative flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src={post.image}
                  alt={post.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              <div className="mt-4">
                <span className="text-sm text-indigo-600 font-medium">
                  {post.category?.name}
                </span>
                <h3 className="text-lg font-bold mt-2 group-hover:text-indigo-600 transition">
                  {post.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{post.description}</p>
              </div>

              <p className="text-gray-400 text-xs mt-3">{post._createdAt}</p>
            </div>
          </Link>
        ))}
      </div>

      {limit && (
        <div className="flex justify-center mt-8">
          <Link href="/blog">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-indigo-700 transition">
              View All Blogs
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Blogs;
