import { client } from "@/sanity/lib/client";
import { POST_QUERY, SINGLE_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
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
  
  const p = await params;
  const recentPosts: BlogPost[] = await client.fetch(POST_QUERY);
  const post = await client.fetch(SINGLE_QUERY, { slug: p.slug });

  if (!post) {
    return <div className="text-center text-xl p-8">Blog Post Not Found!</div>;
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Grid layout */}
        {/* Left Column (Blog Details) */}
        <div className="md:col-span-2">
          {/* Takes up 2/3 of the width */}
          <div className="mb-8">
            {/* Spacing below title */}
            <h1 className="text-2xl font-bold mb-4">{post.name}</h1>
            <div className="mb-4 text-gray-600">
              <span className="mr-4 border px-2 py-1 bg-indigo-400 text-white rounded-sm">
                {post.category?.name}
              </span>
              <span>{post._createdAt}</span>
            </div>
            <div className="relative mt-10 mb-6">
              <Image
                src={post.image}
                alt={post.name}
                width={500} // Adjust width as needed
                height={400} // Adjust height as needed
                className="object-cover rounded-lg border"
              />
            </div>
            <div className="prose lg:prose-xl">{post.description}</div>
          </div>
        </div>
        {/* Right Column (Recent Posts) */}
        <div className="md:col-span-1">
          {" "}
          {/* Takes up 1/3 of the width */}
          <div className="bg-white p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Recent Posts</h2>

            {/*  */}
            <ul>
              {recentPosts.map((recentPost) => (
                <li
                  key={recentPost._id}
                  className=" border-t border-gray-200 py-2"
                >
                  <Link
                    href={`/blog/${recentPost.slug.current}`}
                    className="block hover:bg-slate-100 rounded-md"
                  >
                    <div className=" flex gap-2 items-center">
                      <Image
                        src={recentPost.image}
                        alt={recentPost.name}
                        width={80} // Adjust width as needed
                        height={80} // Adjust height as needed
                        className="object-cover rounded-lg border"
                      />

                      <div className="">
                        <h1 className="font-medium">{recentPost.name}</h1>

                        <p className="text-sm text-gray-500">
                          {recentPost._createdAt}
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
