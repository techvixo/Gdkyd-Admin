import React, { useState } from "react";

const BlogTags = () => {
  const [description, setDescription] = useState(""); // To store the current input
  const [descriptions, setDescriptions] = useState([]); // To store all added descriptions
  const [editIndex, setEditIndex] = useState(null); // Index of the description being edited

  // Function to add or update a description
  const handleAddOrUpdateDescription = () => {
    if (description.trim()) {
      if (editIndex !== null) {
        // Update the existing description
        const updatedDescriptions = descriptions.map((desc, index) =>
          index === editIndex ? description : desc
        );
        setDescriptions(updatedDescriptions);
        setEditIndex(null); // Reset edit mode
      } else {
        // Add a new description
        setDescriptions([...descriptions, description]);
      }
      setDescription(""); // Clear the input field after adding/updating
    }
  };

  // Function to delete a description by index
  const handleDeleteDescription = (index) => {
    const updatedDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(updatedDescriptions);
  };

  // Function to initiate editing mode for a description
  const handleEditDescription = (index) => {
    setDescription(descriptions[index]);
    setEditIndex(index);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <p className="font-semibold text-[#344767] text-sm">
        Blog Tags (You can add multiple texts)
      </p>
      <div className="relative">
        <input
          type="text"
          placeholder="Tag"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="font-semibold w-full text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
        />
        <button
          onClick={handleAddOrUpdateDescription}
          className={`absolute right-0 top-0 h-full text-white rounded-r-sm px-4 ${
            editIndex !== null ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Display the list of added descriptions */}
      <div className="flex flex-col gap-4 mt-4">
        {descriptions.map((desc, index) => (
          <p
            key={index}
            className="relative bg-[#F0F0F0] border border-green-500 p-1 px-3 rounded-full inline-block "
          >
            <span className="font-semibold text-[#344767] text-sm flex-1">
              {desc}
            </span>
           <p className="absolute right-0 top-[-20px]">
           <button
              onClick={() => handleEditDescription(index)}
              className="text-blue-500 font-semibold text-xs px-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteDescription(index)}
              className="text-red-500 font-semibold text-xs px-2"
            >
              Delete
            </button>
           </p>
          </p>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
