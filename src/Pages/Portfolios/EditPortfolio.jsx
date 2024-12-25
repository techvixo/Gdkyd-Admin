import React, { useState, useEffect } from "react";
import defaultImg from "../../assets/default-img.png";
import Loader from "../Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../Constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditPortfolio = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name_en: "",
    name_cn: "",
    description_en: "",
    description_cn: "",
    url: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: portfolio = {}, isLoading, refetch } = useQuery({
    queryKey: ["portfolios", id],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/portfolio/${id}`, {
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
    if (portfolio.data) {
      const { name_en, name_cn, description_en, description_cn, url, image } = portfolio.data;
      setFormData({ name_en, name_cn, description_en, description_cn, url });
      // setImagePreview(image || defaultImg);
    }
  }, [portfolio]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdatePortfolio = async () => {
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      if (selectedFile) {
        form.append("image", selectedFile);
      }

      const response = await axios.patch(`${BASEURL}/portfolio/update/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Portfolio updated successfully");
        navigate("/portfolio");
      } else {
        toast.error("Failed to update the portfolio.");
      }
    } catch (error) {
      console.error("Error updating portfolio:", error);
      toast.error(error.response?.data?.error || "Error updating portfolio");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <h1 className="my-2 font-semibold text-xl text-black pt-7">
        Edit Portfolio Information
      </h1>
      <div className="flex">
        <div className="w-1/3">
          <div className="flex flex-col gap-5 py-3">
            {/* Product Basic */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Product Basic</p>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleInputChange}
                placeholder="Project Name (EN)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                name="name_cn"
                value={formData.name_cn}
                onChange={handleInputChange}
                placeholder="Project Name (CN)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="description_en"
                value={formData.description_en}
                onChange={handleInputChange}
                placeholder="Full Description (EN)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                name="description_cn"
                value={formData.description_cn}
                onChange={handleInputChange}
                placeholder="Full Description (CN)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
            </div>
            {/* Project Link */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Project Link</p>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="Project URL"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-3 py-2">
              <button className="btn btn-outline btn-info btn-sm px-4" onClick={() => navigate("/portfolio")}>
                Cancel
              </button>
              <button className="btn btn-info btn-sm px-4" onClick={handleUpdatePortfolio}>
                Save
              </button>
            </div>
          </div>
        </div>
        {/* Image Preview */}
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
                src={`${BASEURL}/${portfolio?.data?.image}`}
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

export default EditPortfolio;
