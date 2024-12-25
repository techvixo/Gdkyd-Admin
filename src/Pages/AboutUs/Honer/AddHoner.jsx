import React, { useState } from "react";
import AboutMenu from "../AboutMenu";
import BASEURL from "../../../../Constants";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

const AddHoner = () => {
  const [imagePreview, setImagePreview] = useState(null); // Replace with your default image URL
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the uploaded image
    }
  };

  const handleAddHoner = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    const name_en = form.name_en.value;
    const name_cn = form.name_cn.value;
    formData.append("name_en", name_en);
    formData.append("name_cn", name_cn);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    try {
      const response = await axios.post(`${BASEURL}/honor/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      toast.success(`Partner added!`);
      form.reset();
      setSelectedFile(null);
      setImagePreview(null);
      navigate("/about/honer");
    } catch (error) {
      console.log(error);
      toast.error(`${error.response?.data?.error}`);
    }
  };
  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <AboutMenu></AboutMenu>

      <h1 className="my-2 font-semibold text-xl text-[#344767] pt-7">
        This form will be used to add a honer information.
      </h1>
      <div className="flex">
        <div className="w-1/3">
          <form
            onSubmit={handleAddHoner}
            className="flex flex-col gap-5 py-3"
          >
            {/*========== Product Basic=========== */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">
                Image Upload
              </p>
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
              <input
                type="text"
                name="name_en"
                required
                placeholder="Honer Name in English"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
              />
              <input
                type="text"
                name="name_cn"
                required
                placeholder="Honer Name in Chines"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
              />
            </div>
            <div className="flex items-center gap-3 py-2">
              <Link to={"/about/honer"}>
                <button
                  type="button"
                  className="btn btn-outline btn-info btn-sm px-4"
                >
                  Cancel
                </button>
              </Link>
              <input
                type="submit"
                value="Save"
                className="btn  btn-info btn-sm px-4"
              />
            </div>
          </form>
        </div>
        <div className="flex justify-center pt-14 w-2/3">
          {imagePreview && (
            <div className="image-preview relative  w-52 h-52 overflow-hidden rounded-lg mr-4">
              <img
                src={imagePreview}
                alt="Current Preview"
                className="w-full h-full shadow-md rounded-full object-cover"
              />
              <div className="absolute top-3 left-7 bg-red-500 text-white text-xs py-1 px-2 rounded">
                CURRENT IMAGE PREVIEW
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddHoner;
