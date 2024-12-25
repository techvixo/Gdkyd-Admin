import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import './Error.css';

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Initialize countdown to 5 seconds

  useEffect(() => {
    // Create an interval to decrement the countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // After 5 seconds, navigate to the desired page
    if (countdown === 0) {
      navigate('/');
    }

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, navigate]);

  return (
    <div className='container text-center flex items-center justify-center h-screen'>
      <div className="">
        <h1>
          <span className='ops'>Ops!!</span> An Error Occurred!
        </h1>
        {error && (
          <div>
            <span className='not-f'>{error.statusText || error.message}</span>
            <br></br>
            <span className='num'>{error.status}</span>
            <h4 className='font-semibold text-[#1A73E7]'>
              Please wait, page will redirect in <span className='text-red-500 font-bold'>{countdown}</span> seconds.
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
