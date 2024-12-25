import React from "react";

const SearchAndFilter = () => {
  return (
    <div className="flex items-start justify-start gap-6 w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="search for products by name, SKU, or category..."
          className="p-2 bg-none rounded border border-gray-300 w-96"
        />
        <button className="absolute right-2 top-2 text-[#7B809A]">🔍</button>
      </div>
      <div className="l">
      <button className=" text-[#7B809A] border border-gray-300 py-2 px-5 font-semibold pl-12 rounded-md">
        Filter
      </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
