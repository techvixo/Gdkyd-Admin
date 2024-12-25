import { Link } from "react-router-dom";
import SearchAndFilter from "../Products/SearchAndFilter/SearchAndFilter";
import BlogCard from "./BlogCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../Constants";
import Loader from "../Shared/Loader/Loader";

const Blogs = () => {
  // <<<<<<<<< Blogs Data Recived Here.. >>>>>>>>>>
  const {
    data: blogsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs-data"],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/blog/all`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  // console.log(blogsData.data);
  return (
    <div className="p-5 bg-white rounded-md shadow-md">
      <h5 className="text-[#344767] font-semibold text-lg my-3 capitalize">
        This is the main page where admins can view all blog posts
      </h5>
      <div className="flex justify-between items-end">
        {/* Search and Filter */}
        <SearchAndFilter></SearchAndFilter>
        <div className="w-1/3 flex flex-col gap-3 items-end justify-center">
          <Link
            to={"/blog/create"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + ADD NEW BLOG
          </Link>
        </div>
      </div>

      {blogsData?.data?.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mb-6 my-4">
          {blogsData?.data?.map((blog, i) => {
            return <BlogCard refetch={refetch} key={i} blog={blog}></BlogCard>;
          })}
        </div>
      ) : (
        <h2 className="text-2xl font-bold text-gray-300 text-center py-20">
          No Blogs Found!
        </h2>
      )}
    </div>
  );
};

export default Blogs;
