import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Error from "../Pages/Shared/Error/Error";
import SignIn from "../Pages/Shared/Login/SignIn";
import ForgetPassword from "../Pages/Shared/ForgetPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import EmailVarify from "../Pages/Shared/Login/OTPLogin";
import DashBoard from "../Pages/DashBoard/DashBoard";
import VarificationRoute from "./VarificationRoute/VarificationRoute";
import Settings from "../Pages/Settings/Settings";
import Banners from "../Pages/Banners/Banners";
import Products from "../Pages/Products/Products";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Portfolios from "../Pages/Portfolios/Portfolios";
import Blogs from "../Pages/Blogs/Blogs";
import HomePage from "../Pages/HomePage/HomePage";
import Message from "../Pages/Message/Message";
import Home from "../Pages/Banners/Home/Home";
import Service from "../Pages/Banners/Service/Service";
import Contact from "../Pages/Banners/Contact/Contact";
import About from "../Pages/Banners/About/About";
import Portfolio from "../Pages/Banners/Portfolio/Portfolio";
import Blog from "../Pages/Banners/Blog/Blog";
import ManageCategories from "../Pages/Products/ManageCategories/ManageCategories";
import AddProduct from "../Pages/Products/ProductManagement/AddPorduct";
import AddCategory from "../Pages/Products/ManageCategories/AddCaterory";
import AddTeamMember from "../Pages/AboutUs/OurTeams/AddTeam";
import EditTeamMember from "../Pages/AboutUs/OurTeams/EditTeamMember";
import OurTeams from "../Pages/AboutUs/OurTeams/OurTeams";
import Certificates from "../Pages/AboutUs/Certificates/Certificates";
import AddCertificate from "../Pages/AboutUs/Certificates/AddCertificate";
import EditCertificate from "../Pages/AboutUs/Certificates/EditCertificate";
import Partners from "../Pages/AboutUs/Partners/Partners";
import AddPartner from "../Pages/AboutUs/Partners/AddPartner";
import EditPartner from "../Pages/AboutUs/Partners/EditPartner";
import AddPortfolio from "../Pages/Portfolios/AddPortfolio";
import EditPortfolio from "../Pages/Portfolios/EditPortfolio";
import AddBlog from "../Pages/Blogs/AddBlog";
import EditBlog from "../Pages/Blogs/EditBlog";
import OurMachine from "../Pages/HomePage/Machines/OurMechine";
import EditMachine from "../Pages/HomePage/Machines/EditMachine";
import AddMachine from "../Pages/HomePage/Machines/AddMachine";
import FeaturedVideo from "../Pages/HomePage/FeaturedVideo/FeaturedVideo";
import HeroBanner from "../Pages/Banners/HeroBanner/HeroBanner";
import MangeAdmin from "../Pages/Settings/MangeAdmin";
import EditHoner from "../Pages/AboutUs/Honer/EditHoner";
import AddHoner from "../Pages/AboutUs/Honer/AddHoner";
import Honers from "../Pages/AboutUs/Honer/Honers";
import VideosPortfolio from "../Pages/Portfolios/VideosPortfolio";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: (
          // <VarificationRoute>
          //   <DashBoard></DashBoard>
          // </VarificationRoute>
          <PrivateRoute>
            <DashBoard></DashBoard>
          </PrivateRoute>
        ),
      },
      {
        path: "/banner",
        element: (
          <PrivateRoute>
            <Banners></Banners>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/banner",
            element: <Home></Home>
          },
          {
            path: "/banner/home",
            element: <HeroBanner></HeroBanner>
          },
          {
            path: "/banner/service",
            element: <Service></Service>
          },
          {
            path: "/banner/about",
            element: <About></About>
          },
          {
            path: "/banner/portfolio",
            element: <Portfolio></Portfolio>
          },
          {
            path: "/banner/blog",
            element: <Blog></Blog>
          },
          {
            path: "/banner/contact",
            element: <Contact></Contact>
          },
        ],
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
      },
      {
        path: "/products/create",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/products/category",
        element: (
          <PrivateRoute>
            <ManageCategories></ManageCategories>
          </PrivateRoute>
        ),
      },
      {
        path: "/products/category/create",
        element: (
          <PrivateRoute>
            <AddCategory></AddCategory>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <AboutUs></AboutUs>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/teams",
        element: (
          <PrivateRoute>
           <OurTeams></OurTeams>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/teams/create",
        element: (
          <PrivateRoute>
           <AddTeamMember></AddTeamMember>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/teams/edit",
        element: (
          <PrivateRoute>
           <EditTeamMember></EditTeamMember>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/certificates",
        element: (
          <PrivateRoute>
           <Certificates></Certificates>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/certificates/create",
        element: (
          <PrivateRoute>
           <AddCertificate></AddCertificate>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/certificates/edit/:id",
        element: (
          <PrivateRoute>
           <EditCertificate></EditCertificate>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/partners",
        element: (
          <PrivateRoute>
           <Partners></Partners>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/partners/create",
        element: (
          <PrivateRoute>
           <AddPartner></AddPartner>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/partners/edit/:id",
        element: (
          <PrivateRoute>
           <EditPartner></EditPartner>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/honer",
        element: (
          <PrivateRoute>
           <Honers></Honers>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/honer/create",
        element: (
          <PrivateRoute>
           <AddHoner></AddHoner>
          </PrivateRoute>
        ),
      },
      {
        path: "/about/honer/edit/:id",
        element: (
          <PrivateRoute>
           <EditHoner></EditHoner>
          </PrivateRoute>
        ),
      },
      {
        path: "/portfolio",
        element: (
          <PrivateRoute>
           <Portfolios></Portfolios>
          </PrivateRoute>
        ),
      },
      {
        path: "/portfolio/videos",
        element: (
          <PrivateRoute>
           <VideosPortfolio></VideosPortfolio>
          </PrivateRoute>
        ),
      },
      {
        path: "/portfolio/create",
        element: (
          <PrivateRoute>
           <AddPortfolio></AddPortfolio>
          </PrivateRoute>
        ),
      },
      {
        path: "/portfolio/edit/:id",
        element: (
          <PrivateRoute>
           <EditPortfolio></EditPortfolio>
          </PrivateRoute>
        ),
      },
      {
        path: "/blog",
        element: (
          <PrivateRoute>
           <Blogs></Blogs>
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/create",
        element: (
          <PrivateRoute>
           <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/edit/:id",
        element: (
          <PrivateRoute>
           <EditBlog></EditBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <PrivateRoute>
            <HomePage></HomePage>
          </PrivateRoute>
        ),
      },
      {
        path: "/home/machine",
        element: (
          <PrivateRoute>
            <OurMachine></OurMachine>
          </PrivateRoute>
        ),
      },
      {
        path: "/home/machine/create",
        element: (
          <PrivateRoute>
            <AddMachine></AddMachine>
          </PrivateRoute>
        ),
      },
      {
        path: "/home/machine/edit",
        element: (
          <PrivateRoute>
            <EditMachine></EditMachine>
          </PrivateRoute>
        ),
      },
      {
        path: "/home/featured-video",
        element: (
          <PrivateRoute>
            <FeaturedVideo></FeaturedVideo>
          </PrivateRoute>
        ),
      },
      {
        path: "/message",
        element: (
          <PrivateRoute>
           <Message></Message>
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
           <Settings></Settings>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-admin",
        element: (
          <PrivateRoute>
           <MangeAdmin></MangeAdmin>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn></SignIn>,
  },
  {
    path: "/email-verify",
    element: <EmailVarify></EmailVarify>,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword></ForgetPassword>,
  },
]);

export default router;
