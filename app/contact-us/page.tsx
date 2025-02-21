import React from "react";
import { Call, Location, Facebook } from "iconsax-react";
import Link from "next/link";

const ContactUs = () => {
  return (
    <div className="py-8">
      {/* Added padding for responsiveness */}
      <h1 className="text-2xl font-bold mb-6 ">Contact Us</h1>
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Grid for card layout */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center md:items-start">
          {/* Card styling and flexbox for alignment */}
          <Call size="48" color="#6366f1" /> {/* Larger icon */}
          <div className="text-center md:text-left mt-4">
            {/* Text alignment within card */}
            <a
              href="tel:01854666866"
              className="text-lg hover:text-indigo-500 hover:underline"
            >
              {/* Clickable phone number */}
              01854666866
            </a>
          </div>
        </div>

        {/*  */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center md:items-start">
          <Facebook size="48" color="#6366f1" />
          <div className="text-center md:text-left mt-4">
            <Link
              href="https://fb.com/PawStorry"
              target="_blank"
              className="text-lg hover:text-indigo-500 hover:underline"
            >
              fb.com/PawStorry
            </Link>
          </div>
        </div>
        
        {/*  */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center md:items-start">
          <Location size="48" color="#6366f1" />
          <div className="text-center md:text-left mt-4">
            <span className="text-lg">Chittagong, Bangladesh</span>
          </div>
        </div>
      </div>
      {/*  */}
      <h2 className="text-2xl font-bold mt-16 mb-8  ">Our Location</h2>{" "}
      {/* Added margin and text alignment */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        {/* Added overflow hidden for map rounding */}
        <iframe
          src="https://www.google.com/maps?q=Chittagong,+Bangladesh&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }} // Added inline style to remove default border
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
