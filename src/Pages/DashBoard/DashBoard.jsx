import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuickAccess from './QuickAccess/QuickAccess';
import RecentUpdateFeed from './RecentUpdateFeed/RecentUpdateFeed';
import BASEURL from '../../../Constants';
import Loader from '../Shared/Loader/Loader';

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const userId = localStorage.getItem('user_id')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/dashboard/retrive/insights/${userId}`);
        setDashboardData(response.data.data); 
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData(); 
  }, []); 

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <QuickAccess dashboard={dashboardData} />
      <RecentUpdateFeed dashboard={dashboardData} />
    </div>
  );
};

export default DashBoard;
