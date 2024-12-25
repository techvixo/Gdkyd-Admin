import React, { useState } from "react";
import DescriptionInput from "./DescriptionInput";
import BlogTags from "./BlogTags";
import toast from "react-hot-toast";
import axios from "axios";
import BASEURL from "../../../Constants";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../assets/default-img.png";
const AddBlog = () => {
  const [name_en, setNameEn] = useState(""); // Blog title (English)
  const [name_cn, setNameCn] = useState(""); // Blog title (Chinese)
  const [author, setAuthor] = useState(""); // Author name
  const [imagePreview, setImagePreview] = useState(null); // Image preview
  const [selectedFile, setSelectedFile] = useState(null); // Selected image file
  const [descriptionsEn, setDescriptionsEn] = useState([]); 
  const [descriptionsCn, setDescriptionsCn] = useState([]);
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePostBlog = async () => {
    const formData = new FormData();
    formData.append("name_en", name_en);
    formData.append("name_cn", name_cn);
    // formData.append("author", author);
    formData.append("description_en", descriptionsEn);
    formData.append("description_cn", descriptionsCn);
    if (selectedFile) {
      formData.append("heading_image", selectedFile);
    }

    try {
      const response = await axios.post(
        `${BASEURL}/blog/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Ensure you have a valid token
          },
        }
      );

      toast.success(`Blog created successfully`);
      navigate("/blog")
      // Reset the form or handle success response
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Failed to create blog");
    }
  };

  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <h1 className="my-2 font-semibold text-xl text-[#344767] pt-7">
        This is where the admin can input or modify all relevant Blog Post
      </h1>
      <div className="flex">
        <div className="w-1/3">
          <div className="flex flex-col gap-5 py-3">
            {/* Blog Title (English) */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Post Title (English)</p>
              <input
                type="text"
                value={name_en}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Post Title (English)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
              />
            </div>

            {/* Blog Title (Chinese) */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Post Title (Chinese)</p>
              <input
                type="text"
                value={name_cn}
                onChange={(e) => setNameCn(e.target.value)}
                placeholder="Post Title (Chinese)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
              />
            </div>

            {/* Image Upload */}
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


            {/* Author Name */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Author Name</p>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author Name"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
              />
            </div>

            {/* Tags */}
            <BlogTags />

            {/* Buttons */}
            <div className="flex items-center gap-3 py-2">
              <button className="btn btn-outline btn-info btn-sm px-4">
                Cancel
              </button>
              <button
                onClick={handlePostBlog}
                className="btn btn-info btn-sm px-4"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        <div className="flex flex-col p-10 justify-center items-center gap-8 pt-5 w-2/3">
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
          ) :
          (
            <div className="image-preview relative w-52 h-52 overflow-hidden rounded-lg mr-4">
              <img
                src={defaultImg}
                alt="Current Preview"
                className="w-full h-full shadow-md rounded-full object-cover"
              />
              <div className="absolute top-3 left-16 bg-blue-500 text-white text-xs py-1 px-2 rounded">
                Select image
              </div>
            </div>
          )}

          <div className="w-full">
            
            {/* Description Input */}
            <DescriptionInput
              language={"English"}
              descriptions={descriptionsEn}
              setDescriptions={setDescriptionsEn}
            />
            {/* Description Input */}
            <DescriptionInput
              language={"Chines"}
              descriptions={descriptionsCn}
              setDescriptions={setDescriptionsCn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
