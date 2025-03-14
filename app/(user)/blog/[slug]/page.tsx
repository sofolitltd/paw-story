import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BLOG_QUERY, SINGLE_BLOG_QUERY } from "@/sanity/lib/blog_queries";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

type BlogPost = {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  image: string;
  category?: { name: string };
  _createdAt: string;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const recentBlogs: BlogPost[] = await client.fetch(BLOG_QUERY);
  const blog = await client.fetch(SINGLE_BLOG_QUERY, { slug: param.slug });

  if (!blog) {
    return <div className="text-center text-xl p-8">Blog Post Not Found!</div>;
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Blog Details) */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">{blog.name}</h1>
            <div className="mb-4 text-gray-600">
              <span className="mr-4 border px-2 py-1 bg-indigo-400 text-white rounded-md">
                {blog.category?.name}
              </span>
              <span>
                {format(new Date(blog._createdAt), "MMM d yyyy, h:mm a")}
              </span>
            </div>
            <div className="relative mt-10 mb-6">
              <Image
                src={urlFor(blog.image).width(500).url()} 
                alt={blog.name}
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="prose lg:prose-xl">{blog.description}</div>
          </div>
        </div>

        {/* Right Column (Recent Posts) */}
        <div className="md:col-span-1">
          <div className="bg-white p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold pb-2 mb-2 border-b">Recent Posts</h2>
            <ul>
              {recentBlogs.map((recentBlog) => (
                <li
                  key={recentBlog._id}
                  className=" border-gray-200 py-2"
                >
                  <Link
                    href={`/blog/${recentBlog.slug.current}`}
                    className="block hover:bg-slate-100 rounded-md"
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src={urlFor(recentBlog.image).width(80).url()}
                        alt={recentBlog.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-lg border"
                      />
                      <div>
                        <h1 className="font-medium">{recentBlog.name}</h1>
                        <p className="text-sm text-gray-500">
                          {format(
                            new Date(recentBlog._createdAt),
                            "MMM d yyyy, h:mm a"
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
