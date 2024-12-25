import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchAndFilter from "../../Products/SearchAndFilter/SearchAndFilter";
import MachineCard from "./MachineCard";
import HomeMenu from "../HomeMenu";
import BASEURL from "../../../../Constants";
import { toast } from "react-toastify";
import Loader from "../../Shared/Loader/Loader";

const OurMachine = () => {
  const [machines, setMachines] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMachines = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${BASEURL}/web-home`); 
      setMachines(response.data.data.cnc_machine_parts);
      toast.success(response.data.message)
      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching machines:", err);
      toast.error(err.response.data.error)
      setIsLoading(false)
    }
  };
  useEffect(() => {
  fetchMachines();
  }, [isDelete]);

  if (isLoading) {
    return <Loader></Loader>;
  }
// console.log(machines);
  return (
    <div className="p-5 bg-white rounded-md shadow-md">
      <HomeMenu></HomeMenu>
      <div className="flex justify-between items-end">
        <div className="ll">
          <p className="my-2 font-semibold text-[#344767]">Manage Machine</p>
          <SearchAndFilter></SearchAndFilter>
        </div>
        <div className="w-1/3 flex flex-col gap-3 items-end justify-center">
          <Link
            to={"/home/machine/create"}
            className="text-sm text-white py-2 px-4 rounded"
            style={{
              background: "linear-gradient(to bottom, #3E3D45, #202020)",
            }}
          >
            + ADD NEW MACHINE
          </Link>
        </div>
      </div>

      {machines.length > 0 && 
        <div className="grid grid-cols-3 gap-4 mb-6 my-4">
          {machines.map((machine, i) => (
            <MachineCard fetchMachines={fetchMachines} key={i} machine={machine} setIsDelete={setIsDelete}></MachineCard>
          ))}
        </div>
      }
    </div>
  );
};

export default OurMachine;
