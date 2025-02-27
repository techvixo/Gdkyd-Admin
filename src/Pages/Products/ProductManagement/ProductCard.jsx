/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import defaultImg from "../../../assets/default-img.png";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import { Link } from "react-router-dom";

const ProductCard = ({ product, fetchProducts, setIsDelete }) => {

  const [deleteingSlider, setDeleteingSlider] = useState(null);

  const cencelModal = () => {
    setDeleteingSlider(null);
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

  return (
    <div className="flex flex-col gap-2 rounded-lg shadow p-4">
      <>
          <div className="flex flex-wrap gap-2">
            {product.images?.length > 0 ? (
              product?.images.slice(0, 1).map((img, index) => (
                <img
                  key={index}
                  src={`${BASEURL}/${product.images[0]}`}
                  alt="Product"
                  className="w-full rounded"
                />
              ))
            ) : (
              <img
                src={defaultImg}
                alt="Product"
                className="w-full rounded"
              />
            )}
          </div>
          <p className="font-semibold text-[#7B809A] text-sm">
            Product: #{product.productId}
          </p>
          <p className="font-semibold text-[#3c3c3e] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm">
            {product.title_en}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm">
            {product.subTitle_en.slice(0, 400) + " .." }
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm">
            Category: <span className="text-blue-500 font-bold">{product?.category?.title_en}</span>
          </p>
          <div className="flex items-center gap-3">
          <Link to={`/products/edit/${product?._id}`}>
          <button
             
             className="btn btn-outline btn-info btn-sm px-4"
           >
             Edit
           </button></Link>
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
    </div>
  );
};

export default ProductCard;
