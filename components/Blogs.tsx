import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { BLOG_QUERY } from "@/sanity/lib/blog_queries";
import { urlFor } from "@/sanity/lib/image";
import { format } from "date-fns";

interface BlogPost {
  _id: string;
  name: string;
  slug: { current: string };
  description: PortableTextBlock[];
  image: string;
  category: { name: string };
  _createdAt: string;
}

interface BlogsProps {
  limit?: number;
}
interface PortableTextSpan {
  _type: "span";
  text: string;
}

interface PortableTextBlock {
  _type: "block";
  children: PortableTextSpan[];
}


const Blogs: React.FC<BlogsProps> = async ({ limit }) => {
  const blogs = await client.fetch(BLOG_QUERY);
  const displayedBlogs = limit ? blogs.slice(0, limit) : blogs;

  //
 const getPreviewText = (blocks: PortableTextBlock[]): string => {
  if (!blocks || !Array.isArray(blocks)) return "";

  return (
    blocks
      .filter((block) => block._type === "block")
      .map((block) =>
        block.children
          ?.filter((child) => child._type === "span")
          .map((span) => span.text)
          .join("")
      )
      .join(" ")
      .slice(0, 150) + "..."
  );
};


  return (
    <div className="mt-8">
      <h2 className="text-md text-center font-medium mb-1 text-gray-400">
        STAY WITH US
      </h2>
      <h2 className="text-2xl text-center font-semibold mb-8">
        OUR LATEST NEWS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {displayedBlogs.map((blog: BlogPost) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug.current}`}
            className="group"
          >
            <div className="bg-white p-4 rounded-lg hover:shadow-lg transition border border-slate-300 mb-4 relative flex flex-col">
              <Image
                src={urlFor(blog.image).width(500).url()} // Adjust width as needed
                alt={blog.name}
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />

              <div className="mt-4">
                <span className="text-sm text-indigo-600 font-medium">
                  {blog.category?.name}
                </span>
                <h3 className="text-lg font-bold mt-2 group-hover:text-indigo-600 transition">
                  {blog.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {getPreviewText(blog.description)}
                </p>
                

              </div>

              <p className="text-gray-400 text-sm mt-3">
                {format(new Date(blog._createdAt), "MMM d yyyy, h:mm a")}
              </p>
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
