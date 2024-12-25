import React, { useState } from "react";
import defaultImg from "../../assets/default-img.png"
import { Link } from "react-router-dom";
import BASEURL from "../../../Constants";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";
import axios from "axios";
import toast from "react-hot-toast";
const BlogCard = ({blog, refetch}) => {
  const {_id, heading_image, name_cn, name_en, description_cn, description_en, createdAt } = blog;
  const [deleteCertificate, setDeleteCertificate] = useState(null);

  const cancelModal = () => {
    setDeleteCertificate(null)
};
    //============================================================
    // <<<<<<<<< Certificate Delete function here >>>>>>>>>>
    // ===========================================================
    const handleDeleteCertificate = async (blog) => {
      try {
          const response = await axios.delete(`${BASEURL}/blog/delete/${blog?._id}`, {
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
  return (
    <div  className="flex flex-col gap-2 rounded-lg shadow p-4">
      <img
        src={`${BASEURL}/${heading_image}`}
        alt="blog"
        className="w-full h-32 object-cover rounded"
      />
       <p className="font-semibold text-[#7B809A] text-sm">
        Blog: #{_id}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
     {name_en}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
     {name_cn}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
      {description_en[0]?.slice(0,120) + ".."}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
      {description_cn[0]?.slice(0,120) + ".."}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
      Blog Status: Active
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
      Published: {createdAt}
      </p>
      <div className="flex items-center gap-3">
        <Link to={`/blog/edit/${_id}`}
          className="btn btn-outline btn-info btn-sm px-4"
        >
          Edit
        </Link>
        <label onClick={() => setDeleteCertificate(blog)} htmlFor="confirmation-modal"  className="btn btn-outline btn-error btn-sm px-4"> Delete</label>
      </div>
      {
                deleteCertificate && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${blog?.name_en}. It cannot be undo`}
                    closeModal={cancelModal}
                    successAction={handleDeleteCertificate}
                    successButton={`Delete`}
                    modalData={deleteCertificate}
                ></ConfirmationModal>
            }
    </div>
  );
};

export default BlogCard;
