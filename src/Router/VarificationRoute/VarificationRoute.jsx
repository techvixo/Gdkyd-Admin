import  { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
// import { useNavigate } from 'react-router-dom/dist';

import { CirclesWithBar } from  'react-loader-spinner'

const VarificationRoute = ({ children }) => {
  // const [isVerified, setIsVerified] = useState(false);
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  // const navigate = useNavigate()
  // useEffect(() => {
  //   const verified = localStorage.getItem("isVerified");
  //   // Check if verified is "true" (string) and set isVerified accordingly
  //   setIsVerified(verified === "true");
  // }, []);
  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel='circles-with-bar-loading'
      />
    </div>
  }
  const verifiedString = localStorage.getItem("isVerified");
  const isVerified = JSON.parse(verifiedString)
  // console.log(isVerified);
  if ( isVerified) {
    return children;
  }
  return <Navigate to='/profile-verification' state={{ from: location }} replace></Navigate>
  // return navigate("/sign-in")
  //  return <Redirect to="/sign-in" />
};

export default VarificationRoute;