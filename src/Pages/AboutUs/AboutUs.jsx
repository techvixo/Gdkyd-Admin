import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AboutUs = () => {  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/about") {
      navigate("/about/teams"); 
    }
  }, [location, navigate]);
  return (
    <div className=''>
     About Root Page
    </div>
  )
}

export default AboutUs