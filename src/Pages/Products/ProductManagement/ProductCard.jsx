/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import defaultImg from "../../../assets/default-img.png";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const ProductCard = ({ product, fetchProducts, setIsDelete }) => {
  // console.log(product)
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title_en: product.title_en,
    title_cn: product.title_cn,
    subTitle_en: product.subTitle_en,
    subTitle_cn: product.subTitle_cn,
    category: product.category?.categoryId,
    images: product.images || [],
  });
 
  const [imagePreviews, setImagePreviews] = useState(
    product.images?.length > 0
      ? product.images.map((img) => `${BASEURL}/${img}`)
      : [defaultImg]
  );
  const [categories, setCategories] = useState([]);

  const [deleteingSlider, setDeleteingSlider] = useState(null);
  const cencelModal = () => {
    setDeleteingSlider(null);
  };

  const navigate = useNavigate();
  // console.log(imagePreviews)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setEditedProduct((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setEditedProduct((prev) => ({
      ...prev,
      images: files,
    }));
    setImagePreviews(previews);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", editedProduct.title);
    formData.append("subtitle", editedProduct.subtitle);
    formData.append("category", editedProduct.category);

    editedProduct.images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const response = await axios.patch(
        `${BASEURL}/product/update/${product._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
        setIsEditing(false);
        fetchProducts()
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.error || "Error updating product");
    }
  };

  const handleDelete = async (deleteingSlider) => {
    try {
      const response = await axios.delete(`${BASEURL}/product/delete/${deleteingSlider?._id}`);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        fetchProducts()
        setIsDelete(true)
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.error || "Error deleting product");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProduct({
      title: product.title,
      subtitle: product.subtitle,
      category: product.category._id,
      images: product.images || [],
    });
    setImagePreviews(
      product.images?.length > 0
        ? product.images.map((img) => `${BASEURL}/${img}`)
        : [defaultImg]
    );
  };
// console.log(  product.images[0]);
  return (
    <div className="flex flex-col gap-2 rounded-lg shadow p-4">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title_en"
            value={editedProduct.title_en}
            placeholder="Title in English"
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <input
            type="text"
            name="title_cn"
            value={editedProduct.title_cn}
            placeholder="Title in Chinese"
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <input
            type="text"
            name="subTitle_en"
            value={editedProduct.subTitle_en}
            placeholder="Sub Title in English"
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <input
            type="text"
            name="subTitle_cn"
            value={editedProduct.subTitle_cn}
            placeholder="Sub Title in Chinese"
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <select
            value={editedProduct.category}
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
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-2">
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
          <div className="flex flex-wrap gap-2">
            {product.images?.length > 0 ? (
              product?.images.slice(0, 1).map((img, index) => (
                <img
                  key={index}
                  src={`${BASEURL}/${product.images[0]}`}
                  alt="Product"
                  className="w-full h-32 object-cover rounded"
                />
              ))
            ) : (
              <img
                src={defaultImg}
                alt="Product"
                className="w-full h-32 object-cover rounded"
              />
            )}
          </div>
          <p className="font-semibold text-[#7B809A] text-sm">
            Product: #{product.productId}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm">
            {product.subTitle_en}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm">
            Product&apos;s Category: {product?.category?.title_en}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Edit
            </button>
            <label
                onClick={() => setDeleteingSlider(product)}
                htmlFor="confirmation-modal"
                className="btn btn-outline btn-error btn-sm px-4"
              >
                Remove
              </label>
            {deleteingSlider && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deleteingSlider?.title_en}. It cannot be undon`}
          closeModal={cencelModal}
          successAction={handleDelete}
          successButton={`Delete`}
          modalData={deleteingSlider}
        ></ConfirmationModal>
      )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
