import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchAndFilter from "../../Products/SearchAndFilter/SearchAndFilter";
import AboutMenu from "../AboutMenu";
import BASEURL from "../../../../Constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import HonerCard from "./HonerCard";

const Honers = () => {
  // <<<<<<<<< Honers Data Recived Here.. >>>>>>>>>>
  const {
    data: honersData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["honer-data"],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/honor/all`, {
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

  // console.log(honersData.data);
  return (
    <div className="p-5 bg-white rounded-md shadow-md">
      <AboutMenu></AboutMenu>
      <div className="flex justify-between items-end">
        <div className="ll">
          <p className="my-2 font-semibold text-[#344767]">
            Honers Listing
          </p>
          {/* Search and Filter */}
          <SearchAndFilter></SearchAndFilter>
        </div>
        <div className="w-1/3 flex flex-col gap-3 items-end justify-center">
          <Link
            to={"/about/honer/create"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + ADD NEW HONER
          </Link>
        </div>
      </div>

      {/* Product Cards */}
      {honersData?.data?.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mb-6 my-4">
          {honersData?.data?.map((team, i) => {
            return <HonerCard
             key={i}
              certificate={team}
              refetch={refetch}
              ></HonerCard>;
          })}
        </div>
      ) : (
        <h2 className="text-2xl font-bold text-gray-300 text-center py-20">
          No Partner Found!
        </h2>
      )}
    </div>
  );
};

export default Honers;
