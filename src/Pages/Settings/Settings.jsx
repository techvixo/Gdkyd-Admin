import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import img from "../../assets/setting/setting.jpg";
import axios from "axios";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { AuthContext } from "../../context/AuthProvider";
import { FaPhone } from "react-icons/fa";
import BASEURL from "../../../Constants";
import defaultImg from "../../assets/default-img.png"

const Settings = () => {
  const [acceptedMsg, setAcceptedMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
    }
  };
  const triggerFileInput = () => {
    document.getElementById("profileImageInput").click();
  };
  const handleCreateAdmin = async (data) => {
    setAcceptedMsg("");
    setLoginLoading(true);
    setLoading(false);
    const formData = new FormData();
    formData.append("fullName", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("userName", data.userName);
    formData.append("role", "admin");
    // Include the selected file
    if (profileImageFile) {
      formData.append("image", profileImageFile);

    } else {
      setLoginLoading(false)
      return (toast.error("Upload profile image"))
    }
    try {
      const response = await axios.post(`${BASEURL}/user/create`, formData);
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
console.log(response.data)
      if (response.data.status == "success") {
        toast.success(`${response.data.message}`)
        setLoginLoading(false);
        navigate("/manage-admin");
      }
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-md p-6 shadow-lg">
      <div className="img w-full">
        <img src={img} className="w-full" alt="img" />
        <div className="py-4 text-center">
          <Link to={"/manage-admin"} className="text-blue-500 font-semibold text-center uppercase hover:bg-blue-500 hover:text-white transition border border-blue-500 p-1 px-3 rounded-full">Manage Admin</Link>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl md:my-3 font-bold capitalize">
              Create a new Admin
            </h3>
            <span className="text-[#64748B] text-sm">
              Welcome back! please enter your detail
            </span>
          </div>
          <div className="profile_image w-28 h-28 rounded-full shadow overflow-hidden">
        
            {/* Hidden File Input */}
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Clickable Image */}
            <div
              className="profile_image relative w-28 h-28 rounded-full shadow overflow-hidden cursor-pointer"
              onClick={triggerFileInput}
            >
              <div className="absolute text-4xl text-blue-500 top-0 left-0 w-full h-full flex items-center justify-center">
                <BiEdit />
              </div>
              <img
                src={profileImageFile ? URL.createObjectURL(profileImageFile) : defaultImg}
                alt="Current Preview"
                className="w-full h-full shadow-md rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleCreateAdmin)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <div className="w-full relative">
              <span className="absolute text-[#64748B] top-3 left-4 text-2xl">
                {" "}
                <FaRegUser />
              </span>
              <input
                type="text"
                placeholder="enter name"
                {...register("name", { required: true })}
                className="input w-full pl-14 input-bordered"
              />
            </div>
            {errors.name && (
              <span className="text-red-700">
                Please provited your Name
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">User Name</span>
            </label>
            <div className="w-full relative">
              <span className="absolute text-[#64748B] top-3 left-4 text-2xl">
                {" "}
                <FaRegUser />
              </span>
              <input
                type="text"
                placeholder="enter username"
                {...register("userName", { required: true })}
                className="input w-full pl-14 input-bordered"
              />
            </div>
            {errors.userName && (
              <span className="text-red-700">
                Please provide user name
              </span>
            )}
          </div>
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
              <span className="label-text font-semibold">Phone Number</span>
            </label>
            <div className="w-full relative">
              <span className="absolute text-[#64748B] top-3 left-4 text-xl">
                {" "}
                <FaPhone />
              </span>
              <input
                type="number"
                placeholder="enter phone number"
                {...register("phone", { required: true })}
                className="input w-full pl-14 input-bordered"
              />
            </div>
            {errors.phone && (
              <span className="text-red-700">
                Please provide your phone number
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
          <div className="">
            <span className="text-red-600">{acceptedMsg}</span>
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn border-none bg-gradient-to-r from-[#1A73E7] to-[#509AFA] hover:bg-gradient-to-r text-lg hover:from-[#509AFA] hover:to-[#1A73E7] transition text-white"
              value={loginLoading ? "Loading.." : "Make Admin"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
