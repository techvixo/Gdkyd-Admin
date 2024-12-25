import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchAndFilter from "../Products/SearchAndFilter/SearchAndFilter";
import PortfolioCard from "./PortfolioCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BASEURL from "../../../Constants";
import Loader from "../Shared/Loader/Loader";
import PortfolioMenu from "./PortfolioMenu";

const Portfolios = () => {
  
  // <<<<<<<<< Portfolio Data Recived >>>>>>>>>>
  const {
    data: portfolioData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["get-portfolio"],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/portfolio/all`, {
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
      return <Loader></Loader>
  }
  // console.log(portfolioData.data);


  return (
    <div className="p-5 bg-white rounded-md shadow-md">
      <PortfolioMenu></PortfolioMenu>
      <div className="flex justify-between items-end">
        {/* Search and Filter */}
        <SearchAndFilter></SearchAndFilter>
        <div className="w-1/3 flex flex-col gap-3 items-end justify-center">
          <Link
            to={"/portfolio/create"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + ADD NEW PORTFOLIO
          </Link>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6 my-4">
        {portfolioData?.data?.map((portfolio, i) => {
          return <PortfolioCard refetch={refetch} key={i} portfolio={portfolio}></PortfolioCard>;
        })}
      </div>
    </div>
  );
};

export default Portfolios;
