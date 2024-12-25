import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import BASEURL from "../../../../Constants";
import { toast } from "react-toastify";

const ProductManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const itemsPerPage = 6;
  
  // Fetch products from the API using Axios
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASEURL}/product/all`);
      setProducts(response.data.data);
      // toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
  
    fetchProducts();
  }, [isDelete]); // Empty dependency array to run only once when the component mounts

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="">
      <h1 className="my-2 font-semibold text-[#344767]">
        This Page Should Have A Clean, Organized Layout For Admins To Easily
        View, Edit, Or Remove Products.
      </h1>

      <div className="flex justify-between">
        {/* Search and Filter */}
        <SearchAndFilter></SearchAndFilter>
        <div className="w-1/3 flex flex-col gap-3 items-end justify-center">
          <Link
            to={"/products/create"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + Add New Product
          </Link>
          <Link
            to={"/products/category"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + Category Management
          </Link>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6 my-4">
        { 
          currentItems?.map((product, i) => (
            <ProductCard key={i} fetchProducts={fetchProducts} product={product} setIsDelete={setIsDelete}/>
          ))
        }
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Previous
        </button>
        <span className="mx-4">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= products.length}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;
