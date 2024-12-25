import React, { useState, useEffect } from "react";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import axios from "axios";
import BASEURL from "../../../../Constants";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASEURL}/category/all`);
        console.log("API response:", response.data); 
        setCategories(Array.isArray(response.data) ? response.data : response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setCategories((prevCategories) => prevCategories.filter((cat) => cat._id !== id));
  };

  return (
    <div className="bg-white rounded-md shadow-md p-5">
      <h1 className="my-2 font-semibold text-[#344767]">
        This Page Should Have A Clean, Organized Layout For Admins To Easily
        View, Edit, Or Remove categories.
      </h1>

      <div className="flex justify-between">
        {/* Search and Filter */}
        <SearchAndFilter></SearchAndFilter>
        <div className="w-1/3 flex flex-col gap-3 items-end justify-center">
          <Link to={"/products/category/create"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + Add New Category
          </Link>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6 my-5 py-5">
        {displayedCategories.map((category, i) => (
          <CategoryCard key={i} product={category} onDelete={handleDelete} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-600"
        >
          &lt;
        </button>
        {[...Array(Math.ceil(categories.length / itemsPerPage)).keys()].map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page + 1)}
              className={`p-2 ${
                currentPage === page + 1
                  ? "text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {page + 1}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(categories.length / itemsPerPage)}
          className="p-2 text-gray-600"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ManageCategories;
