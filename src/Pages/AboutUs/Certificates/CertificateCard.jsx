import React, { useState } from "react";
import defaultImg from "../../../assets/default-img.png"
import { Link } from "react-router-dom";
import BASEURL from "../../../../Constants";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import { toast } from "react-toastify";
import axios from "axios";
const CertificateCard = ({certificate, refetch}) => {
  const [deleteCertificate, setDeleteCertificate] = useState(null);

  const cancelModal = () => {
    setDeleteCertificate(null)
};
     //============================================================
    // <<<<<<<<< Certificate Delete function here >>>>>>>>>>
    // ===========================================================
    const handleDeleteCertificate = async (certificate) => {
      try {
          const response = await axios.delete(`${BASEURL}/certificate/delete/${certificate?._id}`, {
              headers: {
                  Authorization:  localStorage.getItem("token")
              }
          });

          toast.success(`${response.data.message}`)
          console.log(response.data);
          setDeleteCertificate(null)
          refetch()
          return response.data;
      } catch (error) {
          console.log(error);
      }

  }
  return (
    <div  className="flex flex-col gap-2 rounded-lg shadow p-4">
      <img
        src={`${BASEURL}/${certificate?.image}`}
        alt="certificate"
        className="w-full h-80 object-cover rounded"
      />
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
       {certificate.name_en}
      </p>
      <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
       {certificate.name_cn}
      </p>
      <div className="flex items-center gap-3">
        <Link to={`/about/certificates/edit/${certificate?._id}`}
          className="btn btn-outline btn-info btn-sm px-4"
        >
          Edit
        </Link>
        <label onClick={() => setDeleteCertificate(certificate)} htmlFor="confirmation-modal"  className="btn btn-outline btn-error btn-sm px-4"> Delete</label>
      </div>
      {
                deleteCertificate && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deleteCertificate?.name_en}. It cannot be undo`}
                    closeModal={cancelModal}
                    successAction={handleDeleteCertificate}
                    successButton={`Delete`}
                    modalData={deleteCertificate}
                ></ConfirmationModal>
            }
    </div>
  );
};

export default CertificateCard;
