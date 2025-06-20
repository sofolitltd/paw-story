import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextComponents } from "@portabletext/react";

// Custom components for rendering Portable Text
export const portableTextComponents: PortableTextComponents = {
  // Block-level components
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-5 mt-7 text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mb-4 mt-6 text-gray-900">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-medium mb-3 mt-5 text-gray-900">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },

  // List components
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 ml-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 ml-4 space-y-2">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },

  // Mark components (inline formatting)
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
   
    underline: ({ children }) => <u className="underline">{children}</u>,
    'strike-through': ({ children }) => (
      <s className="line-through">{children}</s>
    ),

    // Link annotations
    link: ({ children, value }) => {
      const target = value?.blank ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noindex nofollow' : undefined;
      
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-indigo-600 hover:text-indigo-800 underline font-medium"
        >
          {children}
        </a>
      );
    },

    internalLink: ({ children, value }) => {
      const slug = value?.reference?.slug?.current;
      
      if (!slug) {
        return <span>{children}</span>;
      }
      
      return (
        <Link
          href={`/blog/${slug}`}
          className="text-indigo-600 hover:text-indigo-800 underline font-medium"
        >
          {children}
        </Link>
      );
    },
  },

  // Custom types
  types: {
    contentImage: ({ value }) => {
      if (!value?.asset) {
        return null;
      }

      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={400}
            className="rounded-lg w-full h-auto"
            priority={false}
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },


    videoEmbed: ({ value }) => {
      if (!value?.url) {
        return null;
      }

      // Basic YouTube embed logic (you can expand this for other platforms)
      const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com/watch?v=')) {
          const videoId = url.split('v=')[1]?.split('&')[0];
          return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('youtu.be/')) {
          const videoId = url.split('youtu.be/')[1]?.split('?')[0];
          return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('vimeo.com/')) {
          const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
          return `https://player.vimeo.com/video/${videoId}`;
        }
        return url;
      };

      const embedUrl = getEmbedUrl(value.url);

      return (
        <div className="my-8">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title={value.title || 'Video'}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.title && (
            <p className="text-center text-sm text-gray-600 mt-2 italic">
              {value.title}
            </p>
          )}
        </div>
      );
    },
  },
};