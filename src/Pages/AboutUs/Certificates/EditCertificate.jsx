import React, { useState } from "react";
import AboutMenu from "../AboutMenu";
import defaultImg from "../../../assets/default-img.png"
import Loader from "../../Shared/Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../../Constants";
import axios from "axios";
import toast from "react-hot-toast";


const EditCertificate = () => {
  const {id} = useParams();
  const [imagePreview, setImagePreview] = useState(defaultImg); // Replace with your default image URL
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the uploaded image
    }
  };

    // <<<<<<<<< Certificate Data Recived Here.. >>>>>>>>>>
    const { data: certificateData = [], isLoading, refetch } = useQuery({
      queryKey: ["certificate-data"],
      queryFn: async () => {
        const response = await axios.get(`${BASEURL}/certificate/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        return response.data;
      },
    });
  
    const handleSaveCertificate = async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData();
  
      const name_en = form.name_en.value;
      const name_cn = form.name_cn.value;
      formData.append("name_en", name_en);
      formData.append("name_cn", name_cn);
      try {
        if (selectedFile) {
          formData.append("image", selectedFile);
        }
  
        await axios.patch(`${BASEURL}/certificate/update/${certificateData?.data?._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Updated!");
        refetch()
        // navigate("/about/certificates")
      } catch (error) {
        console.error("Failed to update team member", error);
        toast.error("Failed to update team member");
      }
    };
    if (isLoading) {
      return <Loader></Loader>;
    }
  
  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <AboutMenu></AboutMenu>

      <h1 className="my-2 font-semibold text-xl text-black pt-7">
      This form will be used to add or edit a Certificate’s information.
      </h1>
     <div className="flex">
     <div className="w-1/3">
        <form  onSubmit={handleSaveCertificate}  className="flex flex-col gap-5 py-3">
          {/*========== Product Basic=========== */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-black text-sm">Image Upload</p>
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
                className="flex items-center justify-center gap-3 my-0 font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-md w-full h-32 cursor-pointer"
              >
                <span className="text-xl mr-1">+</span> Upload New Image
              </label>
            </div>
            <input
              type="text"
              name="name_en"
              placeholder="Certificate Name in English"
              defaultValue={certificateData?.data?.name_en}
              className="font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
            />
            <input
              type="text"
              name="name_cn"
              placeholder="Certificate Name in Chines"
              defaultValue={certificateData?.data?.name_cn}
              className="font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
            />
          </div>
          <div className="flex items-center gap-3 py-2">
           <Link to={"/about/certificates"}>
           <button
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Cancel
            </button>
           </Link>
           <input type="submit" value="Update" className="btn  btn-info btn-sm px-4" />
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
      {certificateData?.data?.image && (
              <div className="image-preview relative  w-52 h-52 overflow-hidden rounded-lg mr-4">
                <img
                  src={`${BASEURL}/${certificateData?.data?.image}`}
                  alt="Current Preview"
                  className="w-full h-full shadow-md rounded-full object-cover"
                />
                <div className="absolute top-3 left-7 bg-green-500 text-white text-xs py-1 px-2 rounded">
                  Previous IMAGE PREVIEW
                </div>
              </div>
            )}
      </div>
     </div>
    </div>
  );
};

export default EditCertificate;
