import React, { useState } from "react";
import defaultImg from "../../assets/default-img.png"
import { Link } from "react-router-dom";
import BASEURL from "../../../Constants";
import axios from "axios";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";
const PortfolioCard = ({portfolio, refetch}) => {
  const {_id, name_en, name_cn, description_en, description_cn, image, url, createdAt} = portfolio
  const [deleteCertificate, setDeleteCertificate] = useState(null);

  const cancelModal = () => {
    setDeleteCertificate(null)
};
    //============================================================
    // <<<<<<<<< Certificate Delete function here >>>>>>>>>>
    // ===========================================================
    const handleDeleteCertificate = async (portfolio) => {
      try {
          const response = await axios.delete(`${BASEURL}/portfolio/delete/${portfolio?._id}`, {
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
        src={image ? `${BASEURL}/${image}` : defaultImg}
        alt="team"
        className="w-full h-32 object-cover rounded"
      />
       <p className="font-semibold text-[#7B809A] text-sm">
        Product: #{_id}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
     {name_en}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
     {name_cn}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
      {description_en}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
      {description_cn}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
      {url}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
      Data: {createdAt}
      </p>
      <div className="flex items-center gap-3">
        <Link to={`/portfolio/edit/${_id}`}
          className="btn btn-outline btn-info btn-sm px-4"
        >
          Edit
        </Link>
        <label onClick={() => setDeleteCertificate(portfolio)} htmlFor="confirmation-modal"  className="btn btn-outline btn-error btn-sm px-4"> Delete</label>
      </div>
      {
                deleteCertificate && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${portfolio?.name_en}. It cannot be undo`}
                    closeModal={cancelModal}
                    successAction={handleDeleteCertificate}
                    successButton={`Delete`}
                    modalData={deleteCertificate}
                ></ConfirmationModal>
            }
    </div>
  );
};

export default PortfolioCard;
