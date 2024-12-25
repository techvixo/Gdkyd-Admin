import React, { useEffect, useState } from "react";
import BannerEditor from "../BannerEditor";
import axios from "axios";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";

const Home = () => {
  const [titleEn, setTitleEn] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [titleCn, setTitleCn] = useState("");
  const [subtitleCn, setSubtitleCn] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem("token");

  const bannerHomeHandler = async () => {
    const formData = new FormData();
    formData.append("title_en", titleEn);
    formData.append("description_en", subtitleEn);
    formData.append("title_cn", titleCn);
    formData.append("description_cn", subtitleCn);
    formData.append("purpose", 'home');
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
      toast.success(`Home banner created successfull`, {
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

  return (
    <div>
      <BannerEditor
        setTitleEn={setTitleEn}
        setSubtitleEn={setSubtitleEn}
        setTitleCn={setTitleCn}
        setSubtitleCn={setSubtitleCn}
        setSelectedFile={setSelectedFile}
        handler={bannerHomeHandler}
      ></BannerEditor>
    </div>
  );
};

export default Home;
