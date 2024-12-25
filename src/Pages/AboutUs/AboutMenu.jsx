import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaHandsHelping } from "react-icons/fa";

const AboutMenu = () => {
  const teamsIcon = <FaUsers />
  const certificate = <LiaCertificateSolid />
  const partner =<FaHandsHelping />
 const menuItems = [
  {
    id: 1,
    title: "Our Team",
    path: "/teams",
    icon: teamsIcon
  },
  {
    id: 1,
    title: "Certificates",
    path: "/certificates",
    icon: certificate
  },
  {
    id: 1,
    title: "Partners",
    path: "/partners",
    icon: partner
  },
  {
    id: 1,
    title: "Honers",
    path: "/honer",
    icon: partner
  },
]
  return (
    <div className='banner_menu'>
     <h5 className='text-[#344767] font-semibold text-lg my-3 capitalize'>This page should include three clearly labeled tabs to organize the content.</h5>
     <div className="flex items-center gap-1 bg-[#F8F9FA] p-1 my-2 shadow">
      {
       menuItems.map((menu, i) => {
        return(
         <NavLink className="p-1 px-8 text-sm rounded font-semibold flex items-center gap-2" key={i} to={`/about${menu.path}`}> <span className='text-md'>{menu.icon}</span>{menu.title}</NavLink>
        )
       })
      }
     </div>
    </div>
  )
}

export default AboutMenu