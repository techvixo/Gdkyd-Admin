import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const BannerMenu = () => {
 const menuItems = [
  {
    id: 1,
    title: "Home",
    path: "/home"
  },
  {
    id: 1,
    title: "Service",
    path: "/service"
  },
  {
    id: 1,
    title: "About",
    path: "/about"
  },
  {
    id: 1,
    title: "Portfolio",
    path: "/portfolio"
  },
  {
    id: 1,
    title: "Blog",
    path: "/blog"
  },
  {
    id: 1,
    title: "Contact",
    path: "/contact"
  },
]
  return (
    <div className='banner_menu'>
     <h5 className='text-[#344767] font-semibold text-lg my-1 capitalize'>Select The specific page for which you want to edit the banner </h5>
     <div className="flex items-center gap-1 bg-[#F8F9FA] p-1 my-2 shadow">
      {
       menuItems.map((menu, i) => {
        return(
         <NavLink className="p-1 px-8 text-sm rounded font-semibold " key={i} to={`/banner${menu.path}`}>{menu.title}</NavLink>
        )
       })
      }
     </div>
    </div>
  )
}

export default BannerMenu