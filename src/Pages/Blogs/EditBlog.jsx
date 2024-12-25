import React, { useEffect, useState } from "react";
import defaultImg from "../../assets/default-img.png";
import DescriptionInput from "./DescriptionInput";
import BlogTags from "./BlogTags";
import Loader from "../Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BASEURL from "../../../Constants";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditBlog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [descriptionsEn, setDescriptionsEn] = useState([]);
  const [descriptionsCn, setDescriptionsCn] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const {
    data: blog = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", id],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/blog/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });
  useEffect(() => {
    if (blog?.data) {
      setDescriptionsEn(blog.data.description_en || []);
      setDescriptionsCn(blog.data.description_cn || []);
    }
  }, [blog]);
  const handleUpdateBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("name_en", blog?.data?.name_en);
      formData.append("name_cn", blog?.data?.name_cn);
      formData.append("description_en", descriptionsEn);
      formData.append("description_cn", descriptionsCn);
      if (selectedFile) {
        formData.append("heading_image", selectedFile);
      }

      const response = await axios.patch(
        `${BASEURL}/blog/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Blog updated successfully");
       navigate("/blog")
      } else {
        toast.error("Failed to update the blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.error || "Error updating blog");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <h1 className="my-2 font-semibold text-xl text-black pt-7">
        Edit Blog Information
      </h1>
      <div className="flex">
        <div className="w-1/3">
          <div className="flex flex-col gap-5 py-3">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Post Title (English)</p>
              <input
                type="text"
                name="title_en"
                defaultValue={blog?.data?.name_en}
                placeholder="Post Title"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
                onChange={(e) => (blog.data.name_en = e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Post Title (Chinese)</p>
              <input
                type="text"
                name="title_cn"
                defaultValue={blog?.data?.name_cn}
                placeholder="Post Title"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
                onChange={(e) => (blog.data.name_cn = e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Insert Images</p>
              <div className="flex items-center justify-between">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center justify-center gap-3 my-0 font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-md w-full h-32 cursor-pointer"
                >
                  <span className="text-xl mr-1">+</span> Upload New Image
                </label>
              </div>
            </div>

            <DescriptionInput
              language={"English"}
              descriptions={descriptionsEn}
              setDescriptions={setDescriptionsEn}
            />
            <DescriptionInput
              language={"Chines"}
              descriptions={descriptionsCn}
              setDescriptions={setDescriptionsCn}
            />
            <BlogTags />

            <div className="flex items-center gap-3 py-2">
              <button className="btn btn-outline btn-info btn-sm px-4">
                Cancel
              </button>
              <button
                onClick={handleUpdateBlog}
                className="btn btn-info btn-sm px-4"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-14 w-2/3">
          {imagePreview ? (
            <div className="image-preview relative w-52 h-52 overflow-hidden rounded-lg mr-4">
              <img
                src={imagePreview}
                alt="Current Preview"
                className="w-full h-full shadow-md rounded-full object-cover"
              />
              <div className="absolute top-3 left-7 bg-red-500 text-white text-xs py-1 px-2 rounded">
                CURRENT IMAGE PREVIEW
              </div>
            </div>
          ) : (
            <div className="image-preview relative w-52 h-52 overflow-hidden rounded-lg mr-4">
              <img
                src={`${BASEURL}/${blog?.data?.heading_image}`}
                alt="Previous Image"
                className="w-full h-full shadow-md rounded-full object-cover"
              />
              <div className="absolute top-3 left-12 bg-green-500 text-white text-xs py-1 px-2 rounded">
                PREVIOUS IMAGE
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
