import React, { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASEURL from "../../../../Constants";
import { BiEdit } from "react-icons/bi";
const BannerCard = ({ refetch, sliderInfo }) => {
  const {
    _id,
    link,
    image,
    description_cn,
    description_en,
    title_cn,
    title_en,
  } = sliderInfo;
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [deleteingSlider, setDeleteingSlider] = useState(null);
  const [titleEn, setTitleEn] = useState(title_en  || "");
  const [titleCn, setTitleCn] = useState(title_cn || "");
  const [desEn, setDesEn] = useState(description_en || "");
  const [desCn, setDesCn] = useState(description_cn || "");
  const [newLink, setNewLink] = useState(link || "");
  const [loader, setLoader] = useState(false);

  const cencelModal = () => {
    setDeleteingSlider(null);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
    }
  };

  const triggerFileInput = (id) => {
    document.getElementById(`profileImageInput-${id}`).click();
  };
  //============================================================
  // <<<<<<<<< Promotion slider Updated function here >>>>>>>>>>
  // ===========================================================
  const handleUpdateSlider = async (sliderInfo) => {
    setLoader(true);
    const formData = new FormData();

    formData.append("title_en", titleEn);
    formData.append("title_cn", titleCn);
    formData.append("description_en", desEn);
    formData.append("description_cn", desCn);
    formData.append("link", newLink);

    if (profileImageFile) {
      formData.append("image", profileImageFile);
    }
    try {
      const response = await axios.patch(
        `${BASEURL}/hero/update/${sliderInfo?._id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(`${response.data.message}`);
      console.log(response.data);
      setPreviewImage(null);
      refetch();
      setLoader(false);
      return response.data;
    } catch (error) {
      console.log(error);
      // toast.error(`${error?.response?.data?.message}`);
      setLoader(false);
      // throw new Error(error?.response?.data?.message);
    }
  };

  //============================================================
  // <<<<<<<<< Promotion slider Delete function here >>>>>>>>>>
  // ===========================================================
  const handleDeleteSlider = async (sliderInfo) => {
    try {
      const response = await axios.delete(
        `${BASEURL}/hero/delete/${sliderInfo?._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success(`${response.data.message}`);
      console.log(response.data);
      setDeleteingSlider(null);
      refetch();
      return response.data;
    } catch (error) {
      console.log(error);
    }
    // console.log(sliderInfo)
  };

  useEffect(() => {
    if (sliderInfo) {
      setTitleEn(sliderInfo?.title_en || "");
      setTitleCn(sliderInfo?.title_cn || "");
      setDesEn(sliderInfo?.description_en || "");
      setDesCn(sliderInfo?.description_cn || "");
      setNewLink(sliderInfo?.link || "");
    }
  }, [sliderInfo]);
  console.log(sliderInfo);
  return (
    <form className="form w-full flex bg-white  shadow-md rounded-md p-5">
      <div className="md:w-1/4 w-full ">
      <div className="profile_image w-full h-full py-5">
          <input
            id={`profileImageInput-${_id}`}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div
            className="profile_image relative w-full h-full cursor-pointer"
            onClick={() => triggerFileInput(_id)}
          >
            <div className="absolute text-4xl hover:bg-[#0000004c] text-white top-0 left-0 w-full h-full flex items-center justify-center">
              <BiEdit />
            </div>
            <img
              src={
                profileImageFile
                  ? URL.createObjectURL(profileImageFile)
                  : `${BASEURL}/${image}`
              }
              alt="Current Preview"
              className="w-full h-full shadow-md object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/4 p-2 relative">
        <div className="w-full">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title in English</span>
              </label>
              <input
                name="title"
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Enter your slider title"
                className="input input-sm   input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title in Chines</span>
              </label>
              <input
                name="title"
                type="text"
                value={titleCn}
                onChange={(e) => setTitleCn(e.target.value)}
                placeholder="Enter your slider title"
                className="input input-sm   input-bordered w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">description in English</span>
              </label>
              <textarea
                name="disc"
                value={desEn}
                onChange={(e) => setDesEn(e.target.value)}
                className="textarea textarea-bordered w-full textarea-xs"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">description in Chines</span>
              </label>
              <textarea
                name="disc"
                value={desCn}
                onChange={(e) => setDesCn(e.target.value)}
                className="textarea textarea-bordered w-full textarea-xs"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Link (optional)</span>
              </label>
              <textarea
                name="link"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="textarea textarea-bordered w-full textarea-xs"
                placeholder="Provite Your Link"
              ></textarea>
            </div>
            <div className=" md:px-4 flex flex-col gap-2 mt-2 items-center justify-center">
              {/* <div className="flex w-full py-2 items-center justify-between">
                  {!status == 1 ? (
                    <span className="text-xs font-semibold text-green-500">
                      Active
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-red-500">
                      Inactive
                    </span>
                  )}
                  <input
                     onClick={() => handleActiveSlider(status, _id)}
                    type="checkbox"
                    className="toggle toggle-sm toggle-success"
                       checked={status}
                  />
                </div> */}
              <label
                onClick={() => setDeleteingSlider(sliderInfo)}
                htmlFor="confirmation-modal"
                className="btn btn-outline btn-error w-full btn-sm"
              >
                Remove
              </label>
              <button
                type="button"
                onClick={() => handleUpdateSlider(sliderInfo)}
                disabled={loader}
                // disabled
                className="company_inf_add_btn bg-gradient-to-r from-[#65CBE2] to-[#346FB7] hover:bg-gradient-to-r hover:from-[#346FB7] hover:to-[#65CBE2]  w-full py-2 uppercase"
              >
                {loader ? "Loading.." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {deleteingSlider && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deleteingSlider?.title_en}. It cannot be undon`}
          closeModal={cencelModal}
          successAction={handleDeleteSlider}
          successButton={`Delete`}
          modalData={deleteingSlider}
        ></ConfirmationModal>
      )}
    </form>
  );
};

export default BannerCard;
