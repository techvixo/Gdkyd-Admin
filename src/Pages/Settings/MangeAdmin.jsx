import React, { useState } from 'react'
import BASEURL from '../../../Constants';
import axios from 'axios';
import Loader from '../Shared/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MangeAdmin = () => {
      const [deleteCertificate, setDeleteCertificate] = useState(null);

      const {
            data: adminData = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["amin-data"],
            queryFn: async () => {
                  const response = await axios.get(`${BASEURL}/user/all`, {
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: localStorage.getItem("token"),
                        },
                  });
                  return response.data;
            },
      });
 
      const cancelModal = () => {
        setDeleteCertificate(null)
    };
        //============================================================
        // <<<<<<<<< Certificate Delete function here >>>>>>>>>>
        // ===========================================================
        const handleDeleteCertificate = async (admin) => {
          try {
              const response = await axios.delete(`${BASEURL}/user/delete/${admin?._id}`, {
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
            return <Loader></Loader>;
      }
      // console.log(adminData.data);
      return (
            <div className='bg-white p-4 rounded-md'>
     <div className="flex items-center justify-between">
     <h3 className='text-2xl font-semibold py-2 text-black'>Manage Admin</h3>
     <Link to={"/settings"} className="text-blue-500 bg-blue-100 text-sm md:px-5 font-semibold text-center uppercase hover:bg-blue-500 hover:text-white transition border border-blue-500 p-1 px-3 rounded-full">New Admin</Link>
     </div>
                  <div className="flex flex-col gap-3 py-5">
                        {
                              adminData?.data?.map((admin, i) => {
                                    return (
                                          <div key={i} className="shadow bg-gray-100 p-2 gap-2 rounded grid grid-cols-4">
                                                <div className="flex font-semibold capitalize items-center justify-around">
                                                      <img
                                                            src={`${BASEURL}/${admin?.image}`}
                                                            alt="Image"
                                                            className="w-12 h-12 shadow-md rounded-full object-cover"
                                                      />
                                                      {admin.fullName}
                                                </div>
                                                <div className="flex items-center overflow-auto">
                                                      {admin.email}
                                                </div>
                                                <div className="justify-center flex items-center">
                                                      {admin.phone}
                                                </div>

                                                <div className="flex items-center justify-around">
                                                      <span className='text-green-500'>  {admin.status}</span>
                                                      <label onClick={() => setDeleteCertificate(admin)} htmlFor="confirmation-modal"  className="btn btn-outline btn-error btn-sm px-4"> Delete</label>
                                                </div>
                                          </div>
                                    )
                              })
                        }
                  </div>
                  {
                deleteCertificate && <ConfirmationModal
                    title={`Are you sure you want to remove?`}
                    message={`If you remove ${deleteCertificate?.fullName}. It cannot be undo`}
                    closeModal={cancelModal}
                    successAction={handleDeleteCertificate}
                    successButton={`Remove`}
                    modalData={deleteCertificate}
                ></ConfirmationModal>
            }
            </div>
      )
}

export default MangeAdmin