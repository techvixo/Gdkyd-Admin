import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
// import { useNavigate } from 'react-router-dom/dist';

import { CirclesWithBar } from  'react-loader-spinner'

const PrivateRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  // const navigate = useNavigate()

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
  const token = localStorage.getItem("token")
  if (token) {
    return children;
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>
  // return navigate("/sign-in")
  //  return <Redirect to="/sign-in" />
};

export default PrivateRoute;