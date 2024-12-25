import React, { useEffect, useState } from "react";
import BannerEditor from "../BannerEditor";
import axios from "axios";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";
import Loader from "../../Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import UpdateBanner from "../UpdateBanner";

const Contact = () => {
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
      const response = await axios.get(`${BASEURL}/web-banner/contact_us`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });
  const bannerContactHandler = async () => {
    const formData = new FormData();
    formData.append("title_en", titleEn);
    formData.append("description_en", subtitleEn);
    formData.append("title_cn", titleCn);
    formData.append("description_cn", subtitleCn);
    formData.append("purpose", 'contact_us');
    if (selectedFile) {
      formData.append("banner_image", selectedFile);
    }

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
      toast.success(`Contact banner created successfull`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

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
  // console.log(bannerData?.data)
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
          handler={bannerContactHandler}
        ></BannerEditor>
      ) : (
        <UpdateBanner data={bannerData?.data} refetch={refetch}></UpdateBanner>
      )}
    </div>
  );
};

export default Contact;
