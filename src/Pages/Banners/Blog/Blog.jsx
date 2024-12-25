import React, { useEffect, useState } from "react";
import BannerEditor from "../BannerEditor";
import axios from "axios";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import UpdateBanner from "../UpdateBanner";

const Blog = () => {
  const [titleEn, setTitleEn] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [titleCn, setTitleCn] = useState("");
  const [subtitleCn, setSubtitleCn] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("token");

  // <<<<<<<<< Banner Data Recived Here.. >>>>>>>>>>
  const {
    data: bannerData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["banner-data"],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/web-banner/blog`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });

  // console.log(bannerData.data);
  const bannerBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title_en", titleEn);
    formData.append("description_en", subtitleEn);
    formData.append("title_cn", titleCn);
    formData.append("description_cn", subtitleCn);
    formData.append("purpose", "blog");
    if (selectedFile) {
      formData.append("banner_image", selectedFile);
    }

    // Reset the form or send `formData` to your API
    try {
      const response = await axios.post(
        `${BASEURL}/web-banner/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Banner created successfull:", response.data);
      toast.success(`Blog banner created successfull`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      refetch();
      // Reset the form or handle success response
    } catch (error) {
      toast.error(`${error.response.data.error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      {!bannerData?.data?.banner_image ? (
        <BannerEditor
          data={bannerData?.data}
          setTitleEn={setTitleEn}
          setSubtitleEn={setSubtitleEn}
          setTitleCn={setTitleCn}
          setSubtitleCn={setSubtitleCn}
          setSelectedFile={setSelectedFile}
          handler={bannerBlogHandler}
        ></BannerEditor>
      ) : (
        <UpdateBanner data={bannerData?.data} refetch={refetch}></UpdateBanner>
      )}
    </div>
  );
};

export default Blog;
