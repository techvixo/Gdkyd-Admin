import "./style.css";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { SiGoogleearthengine } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { FaRegImage  } from "react-icons/fa";
import { MdOutlineAddHome } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { GoProject } from "react-icons/go";
import logo from "../../../assets/logo/logo.png";

const SideNavBar = () => {
  const navigation = useNavigate();
  const dashboard = <RiDashboardFill />;
  const banner = <FaRegImage  />;
  const products = <SiGoogleearthengine />;
  const setting = <IoSettingsSharp />;
  const home = <MdOutlineAddHome />;
  const message = <AiOutlineMessage />;
  const blog = <TfiWrite />;
  const about = <MdManageAccounts />;
  const portfolio = <GoProject />;

  const [menus] = useState([
    {
      name: "Overview",
      path: "/",
      icon: dashboard,
    },
    {
      name: "Banners",
      path: "/banner",
      icon: banner,
    },
    {
      name: "Home Page",
      path: "/home",
      icon: home,
    },
    {
      name: "Products",
      path: "/products",
      icon: products,
    },
    {
      name: "About Us ",
      path: "/about",
      icon: about,
    },
    {
      name: "Portfolio ",
      path: "/portfolio",
      icon: portfolio,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: blog,
    },
    {
      name: "Message",
      path: "/message",
      icon: message,
    },
    {
      name: "Settings",
      path: "/manage-admin",
      icon: setting,
    },
  ]);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isVerified");
    navigation("/");
    // console.log("Out");
  };
  return (
    <>
      <div className="navbar-section-main  bg-[#202020] pl-6">
        <div className="py-2  flex items-center site_logo">
          <Link to="/">
            <img src={logo} className=" w-24" alt="" />
          </Link>
          <span className="text-white text-xl uppercase">Wintec</span>
        </div>
        <div className=" flex flex-col gap-0 md:gap-3 pt-4">
          {menus.map((menu, index) => (
            <div key={index} className="nav-main-menu">
              <NavLink to={menu.path} className={"dashboard-item"}>
                <p className={"flex items-center gap-3  py-1"}>
                  <span className="manu_icon"> {menu.icon}</span>
                  <span className="manu_title">{menu.name}</span>
                </p>
              </NavLink>
            </div>
          ))}

          <div className="nav-main-menu">
            <button
              onClick={() => handleLogOut()}
              className={"dashboard-item "}
            >
              <p className={"flex items-center gap-3"}>
                <span className="manu_icon text-xl">
                  <TbLogout2 />
                </span>
                <span className="manu_title">Logout</span>
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
