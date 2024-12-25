import React from "react";
import { Link } from "react-router-dom";
import addProduct from "../../../assets/overview/add-product.png";
import changeBanner from "../../../assets/overview/change-banner.png";
import editPortfolio from "../../../assets/overview/edit-portfolio.png";
import { IoMdTime } from "react-icons/io";

const QuickAccess = ({ dashboard }) => {
  console.log(dashboard);
  return (
    <div>
      <div className="pt-2">
        {/* Welcome Message */}
        <div className="flex gap-4 pb-4">
          <div className="flex items-center justify-center w-1/3 bg-white p-4 shadow-md rounded-md">
            <h4 className="text-xl font-bold text-gray-800">
              {" "}
              Hi, {dashboard?.user?.fullName}
            </h4>
          </div>
          {/* Quick Access Section */}
          <div className="w-2/3 bg-white p-4 shadow-md rounded-md">
            <div className="ll">
              <h4 className="text-xl font-bold text-gray-800">Quick Access</h4>
              <p className="text-[#7B809A]">You can change from there </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm pt-3">
              <Link
                to="/banner/home"
                className="bg-green-500 text-white text-center py-1 px-2 rounded-md hover:bg-green-600"
              >
                Change Banner
              </Link>
              <Link
                to="/products/create"
                className="bg-blue-500 text-white  text-center py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Create Products
              </Link>
              <Link
                to="blog/create"
                className="bg-orange-500  text-center text-white py-2 px-4 rounded-md hover:bg-orange-600"
              >
                Add New Blog Post
              </Link>
              <Link
                to="/settings"
                className="bg-black text-white text-center py-2 px-4 rounded-md hover:bg-gray-800"
              >
                Create Admin
              </Link>
            </div>
          </div>
        </div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center justify-center gap-2">
            <p className="text-4xl font-bold text-[#4179B6]">
              {dashboard?.totalVisitors}
            </p>
            <p className="text-gray-600 font-semibold text-sm">
              Total Website Visit
            </p>
            {/* <p className="text-xs text-gray-400">Past 30 Days</p> */}
          </div>
          <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center justify-center gap-2">
            <p className="text-4xl font-bold text-[#4179B6]">
              {dashboard?.totalProduct}
            </p>
            <p className="text-gray-600 font-semibold text-sm">
              New Products Added
            </p>
            {/* <p className="text-xs text-gray-400">Past 30 Days</p> */}
          </div>
          <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center justify-center gap-2">
            <p className="text-4xl font-bold text-[#4179B6]">
              {dashboard?.totalBlog}
            </p>
            <p className="text-gray-600 font-semibold text-sm">
              Recent Blog Post
            </p>
            {/* <p className="text-xs text-gray-400">Past 30 Days</p> */}
          </div>
          <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center justify-center gap-2">
            <p className="text-4xl font-bold text-[#4179B6]">
              {dashboard?.totalPortfolio}
            </p>
            <p className="text-gray-600 font-semibold text-sm">Portfolio</p>
            {/* <p className="text-xs text-gray-400">Review Project</p> */}
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          {/*========== Card No 1============ */}
          <div className="rounded-lg shadow-md p-3 relative bg-white">
            <div className=" absolute left-0 top-[-28px] p-3 w-full">
              <Link to={"/products/create"}>
                <div
                  className="flex items-center justify-center w-full h-40 rounded-lg"
                  style={{
                    background: "linear-gradient(to bottom, #509AFA, #1A73E7)",
                  }}
                >
                  <img src={addProduct} alt="quick-icon" className="w-14" />
                </div>
              </Link>
            </div>
            <div className="pt-36">
              <h3 className="font-bold text-[#344767] text-sm">
                ADD NEW PRODUCT
              </h3>
              <p className="text-sm text-[#7B809A] my-1">
                A more detailed chart of website traffic
              </p>
              <p className="text-sm text-[#7B809A] border-t py-3 my-2 mt-4 flex items-center gap-1">
                <span>
                  <IoMdTime />
                </span>
                campaign sent 2 days ago
              </p>
            </div>
          </div>
          {/*========== Card No 2============ */}
          <div className="rounded-lg shadow-md p-3 relative bg-white">
            <div className=" absolute left-0 top-[-28px] p-3 w-full">
              <Link to={"/banner/home"}>
                <div
                  className="flex items-center justify-center w-full h-40 rounded-lg"
                  style={{
                    background: "linear-gradient(to bottom, #63B967, #4BA64F)",
                  }}
                >
                  <img src={changeBanner} alt="quick-icon" className="w-14" />
                </div>
              </Link>
            </div>
            <div className="pt-36">
              <h3 className="font-bold text-[#344767] text-sm">
                CHANGE BANNER
              </h3>
              <p className="text-sm text-[#7B809A] my-1">Change Your Banner</p>
              <p className="text-sm text-[#7B809A] border-t py-3 my-2 mt-4 flex items-center gap-1">
                <span>
                  <IoMdTime />
                </span>
                campaign sent 2 days ago
              </p>
            </div>
          </div>
          {/*========== Card No 3============ */}
          <div className="rounded-lg shadow-md p-3 relative bg-white">
            <div className=" absolute left-0 top-[-28px] p-3 w-full">
              <Link to={"/portfolio"}>
                <div
                  className="flex items-center justify-center w-full h-40 rounded-lg"
                  style={{
                    background: "linear-gradient(to bottom, #3E3D45, #202020)",
                  }}
                >
                  <img src={editPortfolio} alt="quick-icon" className="w-14" />
                </div>
              </Link>
            </div>
            <div className="pt-36">
              <h3 className="font-bold text-[#344767] text-sm">
                EDIT PORTFOLIO
              </h3>
              <p className="text-sm text-[#7B809A] my-1">
                You can add or change your portfolio
              </p>
              <p className="text-sm text-[#7B809A] border-t py-3 my-2 mt-4 flex items-center gap-1">
                <span>
                  <IoMdTime />
                </span>
                campaign sent 2 days ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
