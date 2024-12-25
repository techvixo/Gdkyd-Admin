import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import AboutMenu from "../AboutMenu";
import BASEURL from "../../../../Constants";
import { useNavigate } from "react-router-dom";

// toast.configure();

const AddTeamMember = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate()

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await axios.post(`${BASEURL}/our-team/create`, formData);

      if (response.data.status === "success") {
        toast.success("Team member added successfully!");
        reset();
        setImagePreview(null);
        setSelectedFile(null);
        navigate('/about/teams')
      } else {
        toast.error("Failed to add team member.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <AboutMenu></AboutMenu>
      <h1 className="my-2 font-semibold text-xl text-[#344767] pt-7">
        This form will be used to add or edit a team member’s information.
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <div className="w-1/3">
          <div className="flex flex-col gap-5 py-3">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Image Upload</p>
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
                placeholder="Name in English"
                {...register("name_en")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="Name in Chinese"
                {...register("name_cn")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="Would be Owner/Admin/Manager/Employee"
                {...register("role")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="Exprience in English"
                {...register("experience_en")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="Exprience in Chinese"
                {...register("experience_cn")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="Language"
                {...register("language")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="Address in English"
                {...register("address_en")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="Address in Chinese"
                {...register("address_cn")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="University in English"
                {...register("university_en")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                type="text"
                placeholder="University in Chinese"
                {...register("university_cn")}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
            </div>
            <div className="flex items-center gap-3 py-2">
              <button type="button" className="btn btn-outline btn-info btn-sm px-4" onClick={() => reset()}>
                Cancel
              </button>
              <button type="submit" className="btn btn-info btn-sm px-4">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-14 w-2/3">
          {imagePreview && (
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
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTeamMember;
