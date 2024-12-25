import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
import { RiFolderVideoLine } from "react-icons/ri";
import { SiGodotengine } from "react-icons/si";

const HomeMenu = () => {
  const machineIcon = <SiGodotengine />
  const video = <RiFolderVideoLine />
 const menuItems = [
  {
    id: 1,
    title: "our-Machine",
    path: "/machine",
    icon: machineIcon
  },
  {
    id: 1,
    title: "Featured Video",
    path: "/featured-video",
    icon: video
  }
]
  return (
    <div className='banner_menu'>
     <h5 className='text-[#344767] font-semibold text-lg my-3 capitalize'>This page should include three clearly labeled tabs to organize the content.</h5>
     <div className="flex items-center gap-1 bg-[#F8F9FA] p-1 my-2 shadow">
      {
       menuItems.map((menu, i) => {
        return(
         <NavLink className="p-1 px-8 text-sm rounded font-semibold flex items-center gap-2" key={i} to={`/home${menu.path}`}> <span className='text-md'>{menu.icon}</span>{menu.title}</NavLink>
        )
       })
      }
     </div>
    </div>
  )
}

export default HomeMenu