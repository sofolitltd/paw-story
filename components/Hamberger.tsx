'use client'
import React, { useState } from "react";
import { HambergerMenu, CloseSquare } from "iconsax-react";
import Link from "next/link";
import Image from "next/image";

export default function Hamburger() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button onClick={() => setIsDrawerOpen(true)}>
        <HambergerMenu color="#101010" size={26} variant="Broken" />
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
        <Image src="/logo.svg" alt="Pwa Story Logo" height={24} width={48} />
          
          <button onClick={() => setIsDrawerOpen(false)}>
            <CloseSquare color="#101010" size={26} variant="Bold" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 flex flex-col space-y-1">

        <Link href="/shop" className="hover:bg-gray-100 p-2 rounded">
           Shop
          </Link>
          <Link href="/categories/cat-food" className="hover:bg-gray-100 p-2 rounded">
            Cat Food
          </Link>
          <Link href="/categories/cat-litter" className="hover:bg-gray-100 p-2 rounded">
            Cat Litter
          </Link>
          <Link href="/categories/cat-accessories" className="hover:bg-gray-100 p-2 rounded">
            Cat Accessories
          </Link>
          <Link href="/blog" className="hover:bg-gray-100 p-2 rounded">
            Blog
          </Link>
          <Link href="/contact-us" className="hover:bg-gray-100 p-2 rounded">
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}
    </>
  );
}
