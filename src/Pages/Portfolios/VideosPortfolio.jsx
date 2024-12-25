import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../Constants";
import Loader from "../Shared/Loader/Loader";
import PortfolioMenu from "./PortfolioMenu";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";

const VideosPortfolio = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [deleteCertificate, setDeleteCertificate] = useState(null);

  const cancelModal = () => {
    setDeleteCertificate(null)
};
  // <<<<<<<<< Home Data Recived Here.. >>>>>>>>>>
  const {
    data: videos = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["video-data"],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/video/all`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });

  const createMachine = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      videos_url: [form.videoUrl?.value],
    };

    try {
      const response = await axios.post(`${BASEURL}/video/add`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      refetch();
      toast.success(`video added successfully!`);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Something went wrong!");
    }
  };

      //============================================================
    // <<<<<<<<< Video Delete function here >>>>>>>>>>
    // ===========================================================
    const handleDeleteCertificate = async (video) => {
      try {
          const response = await axios.delete(`${BASEURL}/video/delete/${video?._id}`, {
              headers: {
                  Authorization:  localStorage.getItem("token")
              }
          });

          toast.success(`${response.data.message}`)
          console.log(response.data);
          refetch()
          return response.data;
      } catch (error) {
          console.log(error);
      }

  }
  if (isLoading) {
    return <Loader />;
  }
  console.log(videos);
  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <PortfolioMenu></PortfolioMenu>
      <form onSubmit={createMachine} className=" py-3">
        <h1 className="my-2 font-semibold text-xl text-[#344767]">
          Youtube video embed code
        </h1>
        <div className="flex  gap-5">
          <input
            type="url"
            required
            name="videoUrl"
            placeholder="Enter video embed code URL"
            className="font-semibold text-[#7B809A] w-2/3 text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <div className="flex items-center gap-3 py-2">
            <button
              onClick={() => navigate("/portfolio")}
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Add New Video"
              className="btn btn-info btn-sm px-4"
            />
          </div>
        </div>
      </form>
      <div className="main_container">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#070F11] my-4 md:my-7">
            Video Preview:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {videos?.data?.map((video, i) => {
              return (
               <div key={i} className="lll">
               <div className="py-1">
               <label onClick={() => setDeleteCertificate(video)} htmlFor="confirmation-modal"  className="bg-red-500 cursor-pointer hover:bg-red-600 hover:shadow px-5 rounded-full text-white"> Delete</label>
               </div>
                 <div className="relative w-full h-0 pb-[56.25%]">
                  {video?.link ? (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={video?.link}
                      title="Left Side Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
                      <div className="loader border-t-4 border-b-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
      {
                deleteCertificate && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${video?.link}. It cannot be undo`}
                    closeModal={cancelModal}
                    successAction={handleDeleteCertificate}
                    successButton={`Delete`}
                    modalData={deleteCertificate}
                ></ConfirmationModal>
            }
               </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosPortfolio;
