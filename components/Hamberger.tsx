"use client";
import React, { useState } from "react";
import { HambergerMenu, CloseSquare } from "iconsax-react";
import Link from "next/link";
import Image from "next/image";

export default function Hamburger() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false); // Helper function

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
        <div className="flex justify-between items-center p-4 border-b border-slate-300">
          <Link href="/" onClick={closeDrawer}> {/* Close on logo click */}
            <Image src="/logo.svg" alt="Pwa Story Logo" height={24} width={48} />
          </Link>

          <button onClick={closeDrawer}> {/* Close on X click */}
            <CloseSquare color="#101010" size={26} variant="Bold" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 flex flex-col space-y-1">
          <Link href="/shop" className="hover:bg-gray-100 p-2 rounded" onClick={closeDrawer}>
            Shop
          </Link>
          <Link
            href="/product-category/cat-food"
            className="hover:bg-gray-100 p-2 rounded"
            onClick={closeDrawer}
          >
            Cat Food
          </Link>
          <Link
            href="/product-category/cat-litter"
            className="hover:bg-gray-100 p-2 rounded"
            onClick={closeDrawer}
          >
            Cat Litter
          </Link>
          <Link
            href="/product-category/cat-accessories"
            className="hover:bg-gray-100 p-2 rounded"
            onClick={closeDrawer}
          >
            Cat Accessories
          </Link>
          <Link href="/blog" className="hover:bg-gray-100 p-2 rounded" onClick={closeDrawer}>
            Blog
          </Link>
          <Link href="/contact-us" className="hover:bg-gray-100 p-2 rounded" onClick={closeDrawer}>
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeDrawer} // Close on overlay click
        ></div>
      )}
    </>
  );
}