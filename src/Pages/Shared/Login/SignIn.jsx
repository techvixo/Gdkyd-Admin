import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import img from "../../../assets/login/login.png";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AuthContext } from "../../../context/AuthProvider";
import BASEURL from "../../../../Constants";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (data) => {
    setLoginLoading(true);
    setLoading(false);
    const adminData = {
      email: data.email,
      password: data.password,
    };
    // console.log(adminData);
    // localStorage.setItem("token", "token");
    // localStorage.setItem("userId", 1);
    // localStorage.setItem("isVerified", true);
    // navigate("/");
    try {
      const response = await axios.post(`${BASEURL}/auth/login`, adminData);
      toast.success(`${response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response.data);
      const token = response?.data?.data?.accessToken;
      const userId = response?.data?.data?._id;
      const isVerified = response?.data?.data?.isVerified;
      const email = response?.data?.data?.email;

      if (response?.data?.status === 'success') {
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", userId);
        localStorage.setItem("isVerified", isVerified);
        localStorage.setItem("email", email);
        navigate("/");
      }
      setLoginLoading(false);
      return response.data;
    } catch (error) {
      toast.error(`${error.response.data.error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(error.response.data);
      setLoginLoading(false);
      throw new Error(error.response.data.error);
    }
  };
  // useEffect(() => {
  //     handleSignIn()
  // },[])
  return (
    <div className="md:h-screen flex justify-center items-center">
      <div className="w-5/6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white rounded-md shadow-lg">
          <div className="img w-full">
            <img src={img} className=" w-full md:rounded-l-md" alt="img" />
          </div>
          <div className=" p-5 md:p-10 lg:p-20">
            <div>
              <h3 className="text-2xl md:my-3 font-bold capitalize">
                Sign In to your Account
              </h3>
              <span className="text-[#64748B] text-sm">
                Welcome back! please enter your detail
              </span>
            </div>

            <form onSubmit={handleSubmit(handleSignIn)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <div className="w-full relative">
                  <span className="absolute text-[#64748B] top-3 left-4 text-2xl">
                    {" "}
                    <MdOutlineEmail />
                  </span>
                  <input
                    type="email"
                    placeholder="enter email"
                    {...register("email", { required: true })}
                    className="input w-full pl-14 input-bordered"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-700">
                    Please provited your email
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <span className="absolute top-3 text-[#64748B] left-4 text-2xl">
                    {" "}
                    <RiLockPasswordLine />
                  </span>
                  <input
                    placeholder="enter password"
                    className="input input-bordered  w-full pl-14"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="focus:outline-none absolute right-4 top-4 "
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-700">
                    {errors.password.message}
                  </span>
                )}
                <label className="label">
                  <span className="label-text font-semibold text-red-700">
                    {error}
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-5">
                <div className="form-control">
                  <label className="cursor-pointer gap-5 label">
                    <span className="label-text">Remember me</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-info"
                    />
                  </label>
                </div>
                <div className="forget text-sm">
                  {" "}
                  <Link
                    to="/forgot-password"
                    className="text-[#1A73E7] font-semibold"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn border-none bg-gradient-to-r from-[#1A73E7] to-[#509AFA] hover:bg-gradient-to-r text-lg hover:from-[#509AFA] hover:to-[#1A73E7] transition text-white"
                  value={loginLoading ? "Loading.." : "Sign In"}
                />
              </div>
            </form>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
