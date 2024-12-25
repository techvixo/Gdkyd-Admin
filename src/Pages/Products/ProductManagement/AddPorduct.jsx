import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../../../Constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProductConfiguration from "./ProcuctConfigaration";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [configurations, setConfigurations] = useState({});
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASEURL}/category/all`);
        setCategories(response.data.data);
      } catch (error) {
        console.error(error.response);
        console.error(error.response.data.error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const category = categories.find((cat) => cat._id === selectedId);
    setSelectedCategory(category || {});
    setValue("category", category);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const onSubmit = async (data) => {
    // Ensure selected category exists
    if (!selectedCategory?._id) {
      toast.error("Please select a category.");
      return;
    }
  
    // Prepare the category object
    const category = {
      categoryId: selectedCategory._id,
      title_en: selectedCategory.name_en,
      title_cn: selectedCategory.name_cn,
    };
  
    // Prepare form data
    const formData = new FormData();
    formData.append("title_en", data.title_en);
    formData.append("title_cn", data.title_cn);
    formData.append("subTitle_en", data.subTitle_en);
    formData.append("subTitle_cn", data.subTitle_cn);
    formData.append("description_en", data.description_en);
    formData.append("description_cn", data.description_cn);
    formData.append("category", JSON.stringify(category));
  
    images.forEach((image) => {
      formData.append("images", image);
    });
  
    // Validate configurations
    if (configurations && Object.keys(configurations).length > 0) {
      formData.append("configurations", JSON.stringify(configurations));
    } else {
      toast.error("Please provide your product configuration.");
      return; // Stop execution if configurations are not provided
    }
  
    // API call
    try {
      const response = await axios.post(`${BASEURL}/product/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Handle success
      toast.success(response.data.message);
      navigate("/products");
    } catch (error) {
      // Handle error
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };
  

  return (
    <div className="p-5 rounded-md shadow-md bg-white">
      <h1 className="my-2 font-semibold text-[#344767]">
        This is where the admin can input or modify all relevant product
        details.
      </h1>
      <div className="grid grid-cols-2 gap-12">
        <div className="w-full">
          <div className="flex flex-col gap-5 py-5">
            {/* Product Basic */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">
                Product Basic
              </p>
              <input
                {...register("title_en", {
                  required: "Product name in English is required",
                })}
                type="text"
                placeholder="Product Name in English"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              {errors.title_en && (
                <span className="text-red-500">{errors.title_en.message}</span>
              )}
              <input
                {...register("title_cn", {
                  required: "Product name in Chinese is required",
                })}
                type="text"
                placeholder="Product Name in Chinese"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              {errors.title_cn && (
                <span className="text-red-500">{errors.title_cn.message}</span>
              )}

              {/* Category Dropdown */}
              <select
                {...register("category", {
                  required: "Please select a category",
                })}
                value={selectedCategory._id || ""}
                onChange={handleCategoryChange}
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name_en}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>

            {/* Product Description */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">
                Product Description
              </p>
              <input
                {...register("subTitle_en", {
                  required: "Short description in English is required",
                })}
                type="text"
                placeholder="Short Description in English"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              {errors.subTitle_en && (
                <span className="text-red-500">
                  {errors.subTitle_en.message}
                </span>
              )}
              <input
                {...register("subTitle_cn", {
                  required: "Short description in Chinese is required",
                })}
                type="text"
                placeholder="Short Description in Chinese"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              {errors.subTitle_cn && (
                <span className="text-red-500">
                  {errors.subTitle_cn.message}
                </span>
              )}
              <input
                {...register("description_en")}
                type="text"
                placeholder="Long Description in English"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <input
                {...register("description_cn")}
                type="text"
                placeholder="Long Description in Chinese"
                className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#344767] text-sm">
                Upload Images (you can select multiple image)
              </p>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 py-5">
              <button
                onClick={handleSubmit(onSubmit)}
                className="btn btn-outline btn-info btn-sm px-4"
              >
                Save Drafts
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className="btn btn-info btn-sm px-4"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
        <ProductConfiguration
          setConfigurations={setConfigurations}
          configurations={configurations}
        ></ProductConfiguration>
      </div>
    </div>
  );
};

export default AddProduct;
