import React, { useState } from 'react';

const DescriptionInput = ({descriptions, setDescriptions, language}) => {
  // const [descriptions, setDescriptions] = useState([]); // To store all added descriptions
  const [description, setDescription] = useState(''); // To store the current input
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
      setDescription(''); // Clear the input field after adding/updating
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
console.log(descriptions);
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-[#344767] text-sm">
        Post Description for {language} (You can add multiple texts)
      </p>
      <div className="relative">
        <textarea
          type="text"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="font-semibold min-h-32 w-full text-[#7B809A] text-sm bg-[#F8F8F8] p-2 px-3 rounded-sm"
        />
        <button
          onClick={handleAddOrUpdateDescription}
          className={` text-white rounded-sm px-4 absolute bottom-0 right-3 ${
            editIndex !== null ? 'bg-blue-500' : 'bg-green-500'
          }`}
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Display the list of added descriptions */}
      <div className="flex flex-col gap-4 mt-4">
        {descriptions.map((desc, index) => (
          <div
            key={index}
            className="flex relative items-center gap-2 bg-[#F0F0F0] p-2 px-3 rounded-sm "
          >
            <p className=" text-[#344767] text-sm flex-1">
              {desc}
            </p>
           <div className="absolute right-0 top-[-20px]">
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
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescriptionInput;
