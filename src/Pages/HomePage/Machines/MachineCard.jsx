import { useState } from "react";
import axios from "axios";
import defaultImg from "../../../assets/default-img.png";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";

const MachineCard = ({ machine, fetchMachines, setIsDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMachine, setEditedMachine] = useState({
    title_en: machine.title_en,
    title_cn: machine.title_cn,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    machine.image ? `${BASEURL}/${machine.image}` : defaultImg
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMachine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title_en", editedMachine.title_en);
      formData.append("title_cn", editedMachine.title_cn);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.patch(
        `${BASEURL}/web-home/cnc-machine-part/update/${machine._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Machine updated successfully");
        setIsEditing(false);
        fetchMachines();
      } else {
        toast.error("Failed to update machine.");
      }
    } catch (error) {
      console.error("Error updating machine:", error);
      toast.error(error.response?.data?.error || "Error updating machine");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASEURL}/web-home/cnc-machine-part/delete/${id}`);
      if (response.status === 200) {
        toast.success("Machine deleted successfully");
        setIsDelete(true);
      } else {
        toast.error("Failed to delete machine.");
      }
    } catch (error) {
      console.error("Error deleting machine:", error);
      toast.error(error.response?.data?.error || "Error deleting machine");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMachine({
      title_en: machine.title_en,
      title_cn: machine.title_cn,
    });
    setImageFile(null);
    setImagePreview(machine.image ? `${BASEURL}/${machine.image}` : defaultImg);
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg shadow p-4">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title_en"
            value={editedMachine.title_en}
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <input
            type="text"
            name="title_cn"
            value={editedMachine.title_cn}
            onChange={handleInputChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
          />
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-32 object-cover rounded mt-2"
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
          <img
            src={`${BASEURL}/${machine?.image}` || defaultImg}
            alt="team"
            className="w-full h-32 object-cover rounded"
          />
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {machine.title_en}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {machine.title_cn}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(machine._id)}
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

export default MachineCard;
