import React, { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdAddchart } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../../Constants";
import BannerCard from "./BannerCard";

const HeroBanner = () => {
  const [addActive, setAddActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const hotelId = localStorage.getItem("hotelId");

  const handleAddSliderBtnActive = () => {
    setAddActive(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSliderCancle = () => {
    setAddActive(false);
  };

  const handleAddSlider = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const form = event.target;
    const title_en = form.title_en.value;
    const title_cn = form.title_cn.value;
    const description_en = form.description_en.value;
    const description_cn = form.description_cn.value;
    const link = form.link.value;
    formData.append("title_en", title_en);
    formData.append("title_cn", title_cn);
    formData.append("description_en", description_en);
    formData.append("description_cn", description_cn);
    formData.append("link", link);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }else{
      toast.error("Please chose your banner image!")
      return;
    }
    try {
      const response = await axios.post(`${BASEURL}/hero/create`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      refetch();
      form.reset("");
      setAddActive(false);
      toast.success(`${response.data.message}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      throw new Error(error.response.data.message);
    }
  };

  // <<<<<<<<< Left Slider Data Recived >>>>>>>>>>
  const {
    data: sliderData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sliderData"],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/hero/retrive/all`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });

  // if (isLoading) {
  //     return <Loader></Loader>
  // }
  // console.log(sliderData.data);
  return (
    <div className="">
      {addActive ? (
        <form
          onSubmit={handleAddSlider}
          className="form w-full flex shadow-md rounded-md p-5"
        >
          <div className="md:w-1/4 w-full mt-3">
            <div className="flex items-center justify-center">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="hidden input-fild bg-white"
                onChange={handleImageChange}
              />
              <div className="flex items-center justify-start flex-col gap-1 w-full h-full rounded-md">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Selected Image"
                    className="w-full h-full shadow mr-2 "
                  />
                ) : (
                  <span className="mr-2 text-xs font-semibold text-green-600"></span>
                )}
                {previewImage ? (
                  <span
                    className="text-xs bg-green-300 py-1 px-2 rounded-xl cursor-pointer"
                    onClick={() => document.getElementById("image").click()}
                  >
                    Change image
                  </span>
                ) : (
                  <button
                    type="button"
                    className=" rounded-md text-4xl md:mt-2 px-12 py-12 flex items-center justify-center text-gray-500 bg-[#F9FAFD] border-dashed p-3"
                    onClick={() => document.getElementById("image").click()}
                  >
                    <LuImagePlus />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4 p-2 relative">
            <div className="w-full flex gap-4 items-center">
              <div className="w-full ">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Title English</span>
                    </label>
                    <input
                      name="title_en"
                      type="text"
                      placeholder="Enter the banner title"
                      className="input input-sm   input-bordered w-full"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Title Chines</span>
                    </label>
                    <input
                      name="title_cn"
                      type="text"
                      placeholder="Enter the banner title"
                      className="input input-sm   input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">description English</span>
                    </label>
                    <textarea
                      name="description_en"
                      className="textarea textarea-bordered w-full textarea-xs"
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">description Chines</span>
                    </label>
                    <textarea
                      name="description_cn"
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
                      className="textarea textarea-bordered w-full textarea-xs"
                      placeholder="Provide Your Link"
                    ></textarea>
                  </div>
                  <div className="w-full md:px-8 flex flex-col gap-2 mt-2 items-center justify-center">
                    <button
                      onClick={handleSliderCancle}
                      type="button"
                      className="btn btn-outline btn-error w-full btn-sm"
                    >
                      Cancel
                    </button>
                    <input
                      type="submit"
                      value="add"
                      className="company_inf_add_btn bg-gradient-to-r from-[#65CBE2] to-[#346FB7] hover:bg-gradient-to-r hover:from-[#346FB7] hover:to-[#65CBE2]  w-full py-2 uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-start my-5 border-b-2 pb-5">
          <span
            onClick={handleAddSliderBtnActive}
            className="text-4xl text-gray-600 font-bold cursor-pointer shadow-md p-2 rounded"
          >
            <MdAddchart />{" "}
          </span>
        </div>
      )}
      {/* added slider container here  */}

      {isLoading ? (
        <div className="flex flex-col gap-5">Loading....</div>
      ) : (
        <>
          {sliderData?.data?.length > 0 ? (
            <div className="mt-3">
              <h3 className=" font-bold text-gray-600 uppercase">
                Total Slider :{" "}
                <span className="text-blue-600">{sliderData?.data.length}</span>
              </h3>
              <div className="flex flex-col gap-5">
                {sliderData?.data.map((slider, i) => (
                  <BannerCard
                    key={i}
                    sliderInfo={slider}
                    refetch={refetch}
                  ></BannerCard>
                ))}
              </div>
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-gray-300 text-center py-20">
              No slider available!
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default HeroBanner;
