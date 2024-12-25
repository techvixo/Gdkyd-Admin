import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../../Constants";
import axios from "axios";
import defaultImg from "../../assets/default-img.png";
const AddPortfolio = () => {
  const [imagePreview, setImagePreview] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameEn, setNameEn] = useState("");
  const [nameCn, setNameCn] = useState("");
  const [url, setUrl] = useState("");
  const [descriptionsEn, setDescriptionsEn] = useState("");
  const [descriptionsCn, setDescriptionsCn] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePostPortfolio = async () => {
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_cn", nameCn);
    formData.append("url", url);
    formData.append("description_en", descriptionsEn);
    formData.append("description_cn", descriptionsCn);

    // const addedBy = {
    //   adminId: "1236",
    //   name_en: "Sultan",
    //   name_cn: "Sultan",
    //   email: "sultan@gmail.com",
    // };
    // formData.append("addedBy", JSON.stringify(addedBy));

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await axios.post(`${BASEURL}/portfolio/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Portfolio created successfully");
      navigate("/portfolio");
      // if (response.status === 200) {
      // } else {
      //   toast.error("Failed to create portfolio");
      // }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create portfolio");
    }
  };

  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <h1 className="my-2 font-semibold text-xl text-[#344767] pt-7">
        Input or modify portfolio details.
      </h1>
      <div className="flex">
        <div className="w-1/3">
          <div className="flex flex-col gap-5 py-3">
            {/* Project Basic Details */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Project Name (English)</p>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Project Name (English)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <p className="font-semibold text-[#344767] text-sm">Project Name (Chinese)</p>
              <input
                type="text"
                value={nameCn}
                onChange={(e) => setNameCn(e.target.value)}
                placeholder="Project Name (Chinese)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
            </div>

            {/* Project Link */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Project URL</p>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Project URL"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Description (English)</p>
              <textarea
                value={descriptionsEn}
                onChange={(e) => setDescriptionsEn(e.target.value)}
                placeholder="Description (English)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              ></textarea>
              <p className="font-semibold text-[#344767] text-sm">Description (Chinese)</p>
              <textarea
                value={descriptionsCn}
                onChange={(e) => setDescriptionsCn(e.target.value)}
                placeholder="Description (Chinese)"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Upload Image</p>
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
                <span className="text-xl mr-1">+</span> Upload Image
              </label>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 py-2">
              <button className="btn btn-outline btn-info btn-sm px-4" onClick={() => navigate("/portfolio")}>
                Cancel
              </button>
              <button className="btn btn-info btn-sm px-4" onClick={handlePostPortfolio}>
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
        </div>
      </div>
    </div>
  );
};

export default AddPortfolio;
