import { Outlet } from "react-router-dom";
import Navber from "../../Pages/Shared/Navber/Navber";
import SideNavBar from "../../Pages/Shared/SiteNavber/SideNavBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard_bg flex w-full">
      <div className="dashboard_left_site w-1/5">
        <SideNavBar></SideNavBar>
      </div>
      <div className="dashboard_right_site w-4/5">
        <Navber></Navber>
        <div className="p-3 px-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
