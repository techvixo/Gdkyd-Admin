/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";

const CategoryCard = ({ product, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name_en: product.name_en,
    name_cn: product.name_cn,
    description_en: product.description_en,
    description_cn: product.description_cn,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save after edit
  const handleSave = async () => {
    try {
      const response = await axios.patch(`${BASEURL}/category/update/${product._id}`, editedProduct);
      if (response.status === 200) {
        toast.success("Category updated successfully");
        setIsEditing(false); 
      } else {
        toast.error("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(error.response?.data?.error || "Error updating category");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASEURL}/category/delete/${id}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        onDelete(id);
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.error || "Error deleting category");
    }
  };

  // Handle edit mode toggle
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setEditedProduct({
      name_en: product.name_en,
      name_cn: product.name_cn,
      description_en: product.description_en,
      description_cn: product.description_cn,
    });
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg shadow p-4">
      <p className="font-semibold text-[#7B809A] text-sm">
        Category: #{product.categoryId}
      </p>

      {isEditing ? (
        <>
          <input
            type="text"
            name="name_en"
            value={editedProduct.name_en}
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <textarea
            name="description_en"
            value={editedProduct.description_en}
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <input
            type="text"
            name="name_cn"
            value={editedProduct.name_cn}
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <textarea
            name="description_cn"
            value={editedProduct.description_cn}
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-outline btn-error btn-sm px-4"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {product.name_en}
          </h3>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {product.description_en}
          </p>
          <h3 className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {product.name_cn}
          </h3>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {product.description_cn}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="btn btn-outline btn-error btn-sm px-4"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryCard;
