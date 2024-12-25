import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      navigate("/home/machine");
    }
  }, [location, navigate]);
  return (
    <div className="p-5 bg-white rounded-md shadow-md">
      <HomeMenu></HomeMenu>
      Home Root Page!
    </div>
  );
};

export default HomePage;
