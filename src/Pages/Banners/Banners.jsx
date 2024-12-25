import React, { useEffect } from 'react'
import BannerMenu from './BannerMenu/BannerMenu'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Banners = () => { 
   const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/banner") {
      navigate("/banner/home"); // Navigate to "about" if the current path is "home"
    }
  }, [location, navigate]); // Add location and navigate as dependencies

  return (
    <div className='bg-white p-5 rounded-md shadow-md'>
      <BannerMenu></BannerMenu>
      <Outlet />
    </div>
  )
}

export default Banners