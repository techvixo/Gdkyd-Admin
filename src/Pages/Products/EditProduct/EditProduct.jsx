import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import EditProductConfiguration from "./EditProductConfiguration";
import Loader from "../../Shared/Loader/Loader";
import BASEURL from "../../../../Constants";

const EditProduct = () => {
  const [configurations, setConfigurations] = useState({});
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/product/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response?.data?.data;
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  // Set form default values when product data is fetched
  useEffect(() => {
    if (product) {
      setValue("title_en", product?.title_en || "");
      setValue("title_cn", product?.title_cn || "");
      setValue("subTitle_en", product?.subTitle_en || "");
      setValue("subTitle_cn", product?.subTitle_cn || "");
      setValue("description_en", product?.description_en || "");
      setValue("description_cn", product?.description_cn || "");
      setConfigurations(product?.configurations || {});
      setImages(product?.images || []);
      setPreviewUrls(product?.images || []);
    }
  }, [product, setValue]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title_en", data.title_en);
    formData.append("title_cn", data.title_cn);
    formData.append("subTitle_en", data.subTitle_en);
    formData.append("subTitle_cn", data.subTitle_cn);
    formData.append("description_en", data.description_en);
    formData.append("description_cn", data.description_cn);
    images.forEach((image) => {
      formData.append("images", image);
    });

    if (configurations && Object.keys(configurations).length > 0) {
      formData.append("configurations", JSON.stringify(configurations));
    } else {
      toast.error("Please provide your product configuration.");
      return;
    }

    try {
      const response = await axios.patch(`${BASEURL}/product/update/${product?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
      // navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <h1 className="my-2 font-semibold text-[#344767]">
        This is where the admin can input or modify all relevant product details.
      </h1>
      <div className="grid grid-cols-2 gap-12">
        <div className="w-full">
          <div className="flex flex-col gap-5 py-5">
            {/* Product Basic */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Product Basic</p>
              <input
                {...register("title_en", { required: "Product name in English is required" })}
                type="text"
                placeholder="Product Name in English"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              {errors.title_en && <span className="text-red-500">{errors.title_en.message}</span>}

              <input
                {...register("title_cn", { required: "Product name in Chinese is required" })}
                type="text"
                placeholder="Product Name in Chinese"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              {errors.title_cn && <span className="text-red-500">{errors.title_cn.message}</span>}
            </div>

            {/* Product Category (Read-Only) */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Product Category (not editable)</p>
              <input
                value={product?.category?.title_en || ""}
                readOnly
                type="text"
                className="font-semibold cursor-not-allowed text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                value={product?.category?.title_cn || ""}
                readOnly
                type="text"
                className="font-semibold cursor-not-allowed text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
            </div>

            {/* Product Description */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Product Description</p>
              <input
                {...register("subTitle_en", { required: "Short description in English is required" })}
                type="text"
                placeholder="Short Description in English"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              {errors.subTitle_en && <span className="text-red-500">{errors.subTitle_en.message}</span>}

              <input
                {...register("subTitle_cn", { required: "Short description in Chinese is required" })}
                type="text"
                placeholder="Short Description in Chinese"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              {errors.subTitle_cn && <span className="text-red-500">{errors.subTitle_cn.message}</span>}
            </div>

            {/* Full Description */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Full Product Description</p>
              <textarea
                {...register("description_en", { required: "Full description in English is required" })}
                placeholder="Full Description in English"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm h-20"
              />
              {errors.description_en && <span className="text-red-500">{errors.description_en.message}</span>}

              <textarea
                {...register("description_cn", { required: "Full description in Chinese is required" })}
                placeholder="Full Description in Chinese"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm h-20"
              />
              {errors.description_cn && <span className="text-red-500">{errors.description_cn.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">Upload Product Images</p>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <div className="flex gap-2 mt-2">
                {previewUrls.map((url, index) => (
                  <img key={index} src={url} alt="Preview" className="w-16 h-16 rounded-sm" />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 py-5">
              <button onClick={handleSubmit(onSubmit)} className="btn btn-outline btn-info btn-sm px-4">Save Drafts</button>
              <button onClick={handleSubmit(onSubmit)} className="btn btn-info btn-sm px-4">Publish Now</button>
            </div>
          </div>
        </div>

        {/* Edit Product Configurations */}
        <EditProductConfiguration setConfigurations={setConfigurations} configurations={configurations} />
      </div>
    </div>
  );
};

export default EditProduct;
