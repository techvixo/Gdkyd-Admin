import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeamCard from "./TeamCard";
import SearchAndFilter from "../../Products/SearchAndFilter/SearchAndFilter";
import AboutMenu from "../AboutMenu";
import BASEURL from "../../../../Constants";
import { toast } from "react-toastify";
import Loader from "../../Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";

const OurTeams = () => {
  const [isDelete, setIsDelete] = useState(false);

  // <<<<<<<<< Certificate Data Recived Here.. >>>>>>>>>>
  const { data: ourTeams = [], isLoading, refetch } = useQuery({
    queryKey: ["our-team-data"],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/our-team/all`, {
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
  return (
    <div className="p-5 bg-white rounded-md shadow-md">
      <AboutMenu></AboutMenu>
      <div className="flex justify-between items-end">
        <div className="ll">
          <p className="my-2 font-semibold text-[#344767]">
            Team Member Listing
          </p>
          <SearchAndFilter></SearchAndFilter>
        </div>
        <div className="w-1/3 flex flex-col gap-3 items-end justify-center">
          <Link
            to={"/about/teams/create"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + ADD NEW TEAM MEMBER
          </Link>
        </div>
      </div>
      {
      ourTeams?.data?.length > 0 
      ?
      <div className="grid grid-cols-3 gap-4 mb-6 my-4">
        {ourTeams?.data?.map((team, i) => {
          return (
            <TeamCard
              key={i}
              team={team}
              fetchTeams={refetch}
              setIsDelete={setIsDelete}
            ></TeamCard>
          );
        })}
      </div>
    :
    <h2 className='text-2xl font-bold text-gray-300 text-center py-20'>No Team Member Found!</h2>
     }
    </div>
  );
};

export default OurTeams;
