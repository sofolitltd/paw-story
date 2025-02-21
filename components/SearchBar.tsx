import { SearchNormal } from "iconsax-react";
import React from "react";

export default function SearchBar() {
  return (
    <div className="flex-1">
      <div className=" border rounded-full px-4 py-2 flex w-full lg:w-96 justify-items-center items-center justify-between gap-2">
        <p className=" text-gray-400">Search Product...</p>
        <SearchNormal color="#9ca3af" variant="Linear" size={16} />
      </div>
    </div>
  );
}
