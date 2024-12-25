import React from 'react'
import {  NavLink } from 'react-router-dom'
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineVideoSettings } from "react-icons/md";

const PortfolioMenu = () => {
  const portfolio =<IoImagesOutline />
  const video = <MdOutlineVideoSettings />
 const menuItems = [
  {
    id: 1,
    title: "Portfolio",
    path: "/portfolio",
    icon: portfolio
  },
  {
    id: 1,
    title: "Videos",
    path: "/portfolio/videos",
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
         <NavLink className="p-1 px-8 text-sm rounded font-semibold flex items-center gap-2" key={i} to={`${menu.path}`}> <span className='text-md'>{menu.icon}</span>{menu.title}</NavLink>
        )
       })
      }
     </div>
    </div>
  )
}

export default PortfolioMenu