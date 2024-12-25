import React, { useState } from "react";
import axios from "axios";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [nameEn, setNameEn] = useState("");
  const [nameCn, setNameCn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionCn, setDescriptionCn] = useState("");
  // const [numberOfProducts, setNumberOfProducts] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token")

    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_cn", nameCn);
    formData.append("description_en", descriptionEn);
    formData.append("description_cn", descriptionCn);
    try {
      const response = await axios.post(
        `${BASEURL}/category/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`, 
          },
        }
      );

      if (response.status === 201) {
        toast.success("Category created successfully!");
        setNameEn("");
        setNameCn("");
        setDescriptionEn("");
        setDescriptionCn("");
        // setNumberOfProducts("");

        navigate('/products/category')
      } else {
        alert("Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="p-5 rounded-md shadow-md bg-white pb-36">
      <h1 className="my-2 font-semibold text-[#344767]">
        This is where the admin can input or modify all relevant product
        details.
      </h1>
      <form onSubmit={handleSubmit} className="w-1/3">
        <div className="flex flex-col gap-5 py-5">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#344767] text-lg">
              Add Category Form
            </p>
            <input
              type="text"
              placeholder="Category Name (English)"
              className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Category Name (Chinese)"
              className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              value={nameCn}
              onChange={(e) => setNameCn(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description (English)"
              className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description (Chinese)"
              className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              value={descriptionCn}
              onChange={(e) => setDescriptionCn(e.target.value)}
              required
            />
            {/* <input
              type="number"
              placeholder="Number Of Products"
              className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
              value={numberOfProducts}
              onChange={(e) => setNumberOfProducts(e.target.value)}
              required
            /> */}
          </div>

          <div className="flex items-center gap-3 py-2">
        <Link to={"/products/category"}>
        <button
              type="button"
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Cancel
            </button>
        </Link>
            <button type="submit" className="btn btn-info btn-sm px-4">
              Publish Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
