import React, { useState } from "react";
import AboutMenu from "../AboutMenu";
import defaultImg from "../../../assets/default-img.png"
const EditTeamMember = () => {
  const [imagePreview, setImagePreview] = useState(defaultImg); // Replace with your default image URL
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the uploaded image
    }
  };
  const data={
    id: 1,
    name: "Sultan Mahmud",
    role:"Developer",
    experience:"2",
    language:"English",
    address:"Dhaka, Bangladesh",
    university:"Uttara University",
   }
  
  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <AboutMenu></AboutMenu>

      <h1 className="my-2 font-semibold text-xl text-black pt-7">
      This form will be used to add or edit a team member’s information.
      </h1>
     <div className="flex">
     <div className="w-1/3">
        <div className="flex flex-col gap-5 py-3">
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
              name="Name"
              placeholder="Name"
              defaultValue={data?.name}
              className="font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
            />
            <input
              type="text"
              name=""
              placeholder="Role"
              defaultValue={data?.role}
              className="font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
            />
            <input
              type="text"
              name=""
              placeholder="Experience"
              defaultValue={data?.experience}
              className="font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
            />
            <input
              type="text"
              name=""
              placeholder="Language"
              defaultValue={data?.language}
              className="font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
            />
            <input
              type="text"
              name=""
              placeholder="Address"
              defaultValue={data?.address}
              className="font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
            />
            <input
              type="text"
              name=""
              placeholder="University"
              
              defaultValue={data?.university}
              className="font-semibold text-black text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm "
            />
          </div>
          <div className="flex items-center gap-3 py-2">
            <button
              // onClick={() => handleEdit(product.id)}
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Cancel
            </button>
            <button
              // onClick={() => handleEdit(product.id)}
              className="btn  btn-info btn-sm px-4"
            >
              Update
            </button>
          </div>
        </div>
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

export default EditTeamMember;
