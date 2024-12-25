import React from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import img from "../../../assets/services-img/service-img.png";

const RecentUpdateFeed = ({ dashboard }) => {
  const { recentProducts, recentBlog } = dashboard || {};

  const maxLength = Math.max(recentProducts?.length, recentBlog?.length);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg my-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Update Feed
      </h2>

      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-4">
        <span>RECENT PRODUCT UPDATES</span>
        {/* <span className="w-full text-center">RECENT BLOG POST</span> */}
        <span className="w-full text-center">RECENT BLOG POST</span>
      </div>

      <div className="flex flex-col space-y-4">
        {Array.from({ length: maxLength }).map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            {/* Product Information */}
            <div className="flex items-center space-x-4 w-1/3">
              {recentProducts && recentProducts[index] ? (
                <>
                  <img
                    src={img}
                    alt={recentProducts[index].title_en}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-700">
                      {recentProducts[index].title_en}
                    </p>
                    <p
                      className={`text-xs ${
                        recentProducts[index].status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {recentProducts[index].status === "active"
                        ? "PUBLISHED"
                        : "DRAFTS"}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-gray-400">No Product</div>
              )}
            </div>

            <div className="w-1/3 text-center">
              {recentBlog && recentBlog[index] ? (
                <>
                  <p className="text-gray-700">{recentBlog[index].name_en}</p>
                  <div className="flex items-center justify-center space-x-2">
                    {/* EDIT Button */}
                    <button className="text-blue-500 flex items-center space-x-1">
                      <FiEdit />
                      <span>
                        <Link to={`/blog/edit/${recentBlog[index]._id}`}>
                          EDIT
                        </Link>
                      </span>
                    </button>
                    <button className="text-blue-500 flex items-center space-x-1">
                      <FiEye />
                      <span>
                        <Link to="/blog">VIEW</Link>
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-gray-400">No Blog</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUpdateFeed;
