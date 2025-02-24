"use client";

import Link from "next/link";
import React from "react";
import {
  Location,
  Call,
  Facebook,
  ShoppingCart,
  Profile,
} from "iconsax-react";
import Image from "next/image";
import Hamburger from "@/components/Hamberger";
import SearchBar from "./SearchBar";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <>
      {/* Top bar */}
      <div className="bg-indigo-500 w-full">
        <div className="h-10 text-white flex items-center container mx-auto max-w-7xl px-4 justify-between overflow-hidden">
          {/* Contact Info */}
          <div className="flex space-x-4 flex-wrap text-sm">
            <Link href="tel:+8801854666866">
              <div className="flex gap-1 items-center">
                <Call color="#eee" variant="Bold" size={16} />
                <p>01854666866</p>
              </div>
            </Link>
            <div className="hidden md:block">|</div>
            <Link href="/contact-us">
              <div className="flex gap-1 items-center">
                <Location color="#eee" variant="Bold" size={16} />
                <p>Our Location</p>
              </div>
            </Link>
         
          </div>

          {/* Social */}
          <div className="flex-shrink-0 hidden md:flex lg:flex">
            <Link href="https://facebook.com/PawStoryy">
              <Facebook color="#eee" variant="Bold" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto max-w-7xl py-4 px-4  flex justify-between items-center gap-3 ">
        {/* hamberger */}
        <div className="flex md:flex lg:hidden">
          <Hamburger />
        </div>

        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="Pwa Story Logo" height={32} width={64} />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:hidden lg:flex">
          <SearchBar />
        </div>

        {/* Profile & Cart */}
        <div className="flex gap-3">
          <Link href="/customer/profile">
            <div className="border rounded-full py-2 px-3 flex items-center gap-2">
              <Profile color="#101010" variant="Bold" size={16} />
              <p className="hidden lg:flex">Profile</p>
            </div>
          </Link>

          {/* cart */}
          <Link href="/cart">
            <div className=" relative border rounded-full py-2 px-3 flex items-center gap-2">
              <ShoppingCart color="#101010" variant="Bold" size={16} />
              <p className="hidden lg:flex">Cart</p>
              {cartCount > 0 && (
                <span className=" bg-red-500 text-white text-[10px] leading-tight px-1 py-0.5   rounded-full ">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full border-t lg:border-y">
        <div className="px-4 lg:px-0 py-2 flex container mx-auto max-w-7xl gap-2 items-center justify-between">
          {/* Desktop Navigation */}

          <div className="hidden md:hidden lg:flex space-x-3">
            <Link
              href="/shop"
              className="px-3 py-2 hover:bg-slate-100 rounded-full"
            >
              Shop
            </Link>
            <Link
              href="/product-category/cat-food"
              className="px-3 py-2 hover:bg-slate-100 rounded-full"
            >
              Cat Food
            </Link>
            <Link
              href="/product-category/cat-litter"
              className="px-3 py-2 hover:bg-slate-100 rounded-full"
            >
              Cat Litter
            </Link>
            <Link
              href="/product-category/cat-accessories"
              className="px-3 py-2 hover:bg-slate-100 rounded-full"
            >
              Cat Accessories
            </Link>
          </div>

          {/* Additional Links */}
          <div className="hidden md:hidden lg:flex space-x-3">
            <Link
              href="/blog"
              className="px-3 py-2 hover:bg-slate-100 rounded-full"
            >
              Blog
            </Link>
            <Link
              href="/contact-us"
              className="px-3 py-2 hover:bg-slate-100 rounded-full"
            >
              Contact Us
            </Link>
          </div>

          {/* Search Bar */}
          <div className=" flex lg:hidden w-full sm:w-full">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}
