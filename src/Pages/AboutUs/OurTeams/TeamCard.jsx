/* eslint-disable react/prop-types */
import { useState } from "react";
import BASEURL from "../../../../Constants";
import defaultImg from "../../../assets/default-img.png";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const TeamCard = ({ team, fetchTeams, setIsDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeam, setEditedTeam] = useState({ ...team });
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteingSlider, setDeleteingSlider] = useState(null);

  const cencelModal = () => {
    setDeleteingSlider(null);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTeam({ ...editedTeam, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      for (const key in editedTeam) {
        formData.append(key, editedTeam[key]);
      }
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.patch(`${BASEURL}/our-team/update/${team._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false);
      toast.success("Updated!");
      fetchTeams()
    } catch (error) {
      console.error("Failed to update team member", error);
      toast.error("Failed to update team member");
    }
  };

  const handleCancel = () => {
    setEditedTeam({ ...team });
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASEURL}/our-team/delete/${team._id}`);
      setIsDelete(true);
      toast.success("Delete successful");
      fetchTeams()
    } catch (error) {
      console.error("Failed to delete team member", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg shadow p-4">
      <img
        src={
          selectedImage
            ? URL.createObjectURL(selectedImage)
            : `${BASEURL}/${team.image}` || defaultImg
        }
        alt="team"
        className="w-full h-60 object-cover rounded"
      />
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="role"
            value={editedTeam.role}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="name_en"
            value={editedTeam.name_en}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="name_cn"
            value={editedTeam.name_cn}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="experience_en"
            value={editedTeam.experience_en}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="experience_cn"
            value={editedTeam.experience_cn}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="language"
            value={editedTeam.language}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="address_en"
            value={editedTeam.address_en}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="address_cn"
            value={editedTeam.address_cn}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="university_en"
            value={editedTeam.university_en}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="text"
            name="university_cn"
            value={editedTeam.university_cn}
            onChange={handleInputChange}
            className="p-2 border rounded-sm"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 border rounded-sm"
          />
          <div className="flex gap-2 mt-2">
            <button onClick={handleSave} className="btn btn-success btn-sm">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-warning btn-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.role}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.name_en}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.name_cn}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.experience_en}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.experience_cn}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.language}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.address_en}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.address_cn}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.university_en}
          </p>
          <p className="font-semibold text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm ">
            {team.university_cn}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline btn-info btn-sm px-4"
            >
              Edit
            </button>
            {/* <button
              onClick={handleDelete}
              className="btn btn-outline btn-error btn-sm px-4"
            >
              Delete
            </button> */}
            <label
              onClick={() => setDeleteingSlider(team)}
              htmlFor="confirmation-modal"
              className="btn btn-outline btn-error btn-sm px-4"
            >
              Delete
            </label>
          </div>
          {deleteingSlider && (
            <ConfirmationModal
              title={`Are you sure you want to delete?`}
              message={`If you delete ${deleteingSlider?.name_en}. It cannot be undon`}
              closeModal={cencelModal}
              successAction={handleDelete}
              successButton={`Delete`}
              modalData={deleteingSlider}
            ></ConfirmationModal>
          )}
        </>
      )}
    </div>
  );
};

export default TeamCard;
