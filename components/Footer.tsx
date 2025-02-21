import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Pwa Story Logo"
              height={36}
              width={72}
            />
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            The best online pet shop for quality cat food, litter, and
            accessories in Bangladesh.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/shop" className="hover:text-indigo-400 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-indigo-400 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="hover:text-indigo-400 transition"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-white text-lg font-semibold">Subscribe</h3>
          <p className="text-sm text-gray-400 mt-2">
            Get updates on new products and special offers!
          </p>
          <div className="mt-3 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-lg bg-gray-800 text-gray-300 focus:outline-none"
            />
            <button className="bg-indigo-600 px-4 py-2 rounded-r-lg text-white hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social Icons & Copyright */}
      <div className="container mx-auto max-w-7xl border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center px-6">
        {/*  */}
        <div className="flex space-x-4 text-sm">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
        </div>

          {/*  */}
          <p className="text-sm mt-4 md:mt-0 lg:mt-0">
          &copy; {new Date().getFullYear()} Paw Story | All Rights Reserved
        </p>

        {/* Developed by Section */}
        <div className="text-center mt-4 md:mt-0 lg:mt-0">
          <p className="text-sm">
            Developed by:{" "}
            <Link
              href="https://sofolit.vercel.app/"
              target="_blank"
              className="text-indigo-400 hover:underline"
            >
              SOFOL IT
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
