import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchAndFilter from "../../Products/SearchAndFilter/SearchAndFilter";
import AboutMenu from "../AboutMenu";
import CertificateCard from "./CertificateCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import BASEURL from "../../../../Constants";
import axios from "axios";

const Certificates = () => {
  // <<<<<<<<< Certificate Data Recived Here.. >>>>>>>>>>
  const { data: certificateData = [], isLoading, refetch } = useQuery({
    queryKey: ["certificate-data"],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/certificate/all`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }
  
  // console.log(certificateData.data);
  return (
    <div className="p-5 bg-white rounded-md shadow-md">
      <AboutMenu></AboutMenu>
      <div className="flex justify-between items-end">
        <div className="ll">
          <p className="my-2 font-semibold text-[#344767]">
            Certificate Listing
          </p>
          {/* Search and Filter */}
          <SearchAndFilter></SearchAndFilter>
        </div>
        <div className="w-1/3 flex flex-col gap-3 items-end justify-center">
          <Link
            to={"/about/certificates/create"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + ADD NEW CERTIFICATE
          </Link>
        </div>
      </div>

      {/* Product Cards */}
     {
      certificateData?.data?.length > 0 
      ?
      <div className="grid grid-cols-3 gap-4 mb-6 my-4">
      {certificateData?.data?.map((certificate, i) => {
        return (
          <CertificateCard
            key={i}
            refetch={refetch}
            certificate={certificate}
          ></CertificateCard>
        );
      })}
    </div>
    :
    <h2 className='text-2xl font-bold text-gray-300 text-center py-20'>No Certificates Found!</h2>
     }
    </div>
  );
};

export default Certificates;
