import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

interface BlogsProps {
  posts: BlogPost[];
  limit?: number; // Optional limit parameter
}

const Blogs: React.FC<BlogsProps> = ({ posts, limit }) => {
  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="mt-8">
      <h2 className="text-md text-center font-medium mb-1 text-gray-400">
        STAY WITH US
      </h2>
      <h2 className="text-2xl text-center font-semibold mb-8">
        OUR LATEST NEWS
      </h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {displayedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border mb-4 relative flex flex-col">
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="mt-4">
                <span className="text-sm text-indigo-600 font-medium">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold mt-2 group-hover:text-indigo-600 transition">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>
              </div>

              {/* Date */}
              <p className="text-gray-400 text-xs mt-3">{post.publishedAt}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Show "View All Blogs" Button Only If Limited Posts Are Displayed */}
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
