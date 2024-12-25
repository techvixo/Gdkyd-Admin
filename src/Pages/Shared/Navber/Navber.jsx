import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
// import BASEURL from "../../../Constants";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
const Navber = () => {
  const [authenticated, setAuthenticated] = useState("");
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const location = useLocation();

  // Split the pathname by "/" and get the last part
  const pathSegments = location?.pathname?.split("/");
  const routerName =
    location?.pathname === "/"
      ? "Overview"
      : pathSegments[pathSegments?.length - 1];
 
  const handleSignOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("verified");
    localStorage.removeItem("email");
    navigate("/");
  };
  //   Check Authentication
  if (authenticated === "Unauthenticated.") {
    localStorage.clear();
    navigate("/");
    console.log("LogOut");
    setAuthenticated("");
  }

  return (
    <div className="shadow-sm py-2 navber_main_bg px-8">
      <div className="flex items-center justify-between  w-full">
        <div className="w-1/2">
          <p className="flex items-center gap-2 md:font-semibold text-xs">
            <span className="font-semibold text-xl">
              <GoHome />
            </span>
            <span> / Pages </span>
            <span>/</span>
            <span className="capitalize">{routerName}</span>
          </p>
          <h2 className="text-xl md:text-xl font-bold uppercase text-[#252B42] ">
            {routerName}
          </h2>
        </div>
        <div className="flex items-center justify-end gap-5 w-1/2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search here"
              className="search_input input-sm bg-[#F0F2F5] text-sm"
            />
          </div>
          {/* This section for Profile manu  */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="text-xl text-[#7B809A] hover:text-[#4179B6] transition cursor-pointer">
            <FaUserCircle />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-1 rounded p-2 shadow bg-base-100 w-52"
            >
              <li>
                <Link to="/message" className="">
                  <FaUserShield />
                  Message
                </Link>
              </li>
              <li>
                <Link to="/products" className="">
                  <FaUserShield />
                  Products List
                </Link>
              </li>
              {/* <li><Link>Settings</Link></li> */}
              {token ? (
                <li onClick={handleSignOut}>
                  <button
                    type="button"
                    className=" btn-xs flex items-center  transition text-center  pl-4 my-2 bg-blue-400 text-white hover:bg-red-500 rounded-full"
                  >
                    <span>
                      <HiOutlineLogout />
                    </span>
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              )}
            </ul>
          </div>
          {/* This section for Settings  */}
          <Link to="/settings" className="text-xl text-[#7B809A] hover:text-[#4179B6] transition cursor-pointer">
            <IoSettingsSharp />
          </Link>
          {/* This section for Notification  */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="text-xl text-[#7B809A] hover:text-[#4179B6] transition cursor-pointer">
            <IoNotificationsSharp />
            </label>
            <div
              tabIndex={0}
              className=" flex items-start justify-start dropdown-content mt-1 z-[1]  shadow-md bg-white rounded-md w-72"
            >
              <div className="main-containt w-full">
                <h2 className="text-sx p-2 font-semibold rounded-t-md text-start text-gray-700 w-full bg-[#EDF2F9]">
                  Notification
                </h2>
                <div className="notifications h-[200px]">
                  <p className="text-sm pt-8 font-semibold text-center text-gray-500">
                    No notification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navber;
