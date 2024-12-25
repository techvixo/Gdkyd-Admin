import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductConfiguration = ({configurations, setConfigurations}) => {
  // const [configurations, setConfigurations] = useState({});
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [editingKey, setEditingKey] = useState(null);

  // Handler to add or update a configuration
  const handleAddOrUpdateConfiguration = () => {
    if (keyInput.trim() && valueInput.trim()) {
      setConfigurations((prev) => {
        const updatedConfigurations = { ...prev };

        // If editing, remove the old key if it has changed
        if (editingKey && editingKey !== keyInput) {
          delete updatedConfigurations[editingKey];
        }

        // Add or update the configuration
        updatedConfigurations[keyInput] = valueInput;
        return updatedConfigurations;
      });

      // Reset input fields and exit editing mode
      setKeyInput("");
      setValueInput("");
      setEditingKey(null);
    } else {
      alert("Both key and value are required.");
    }
  };

  // Handler to delete a configuration
  const handleDeleteConfiguration = (key) => {
    setConfigurations((prev) => {
      const updatedConfigurations = { ...prev };
      delete updatedConfigurations[key];
      return updatedConfigurations;
    });
  };

  // Handler to start editing a configuration
  const handleEditConfiguration = (key) => {
    setKeyInput(key);
    setValueInput(configurations[key]);
    setEditingKey(key);
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">Product Configuration</h2>

      {/* Input fields for key and value */}
      <div className="mb-4 grid grid-cols-10 w-full bg-gray-400">
        <div className="col-span-8 grid grid-cols-2 ">
          <input
            type="text"
            placeholder="Enter key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="flex-1 p-2 border rounded-r-none"
          />
          <input
            type="text"
            placeholder="Enter value"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="flex-1 p-2 border rounded-l-none"
          />
        </div>
        <div className="col-span-2">
          <button
            onClick={handleAddOrUpdateConfiguration}
            className="w-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            {editingKey !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Displaying the configurations */}
      <h3 className="text-lg font-semibold mb-2">Configurations:</h3>
      {Object.keys(configurations).length > 0 ? (
        <ul className="list-disc pl-5">
          {Object.entries(configurations).map(([key, value], index) => (
            <li key={index} className="mb-1 flex justify-between items-center">
              <span>
                <span className="font-bold">{key}</span>: {value}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditConfiguration(key)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteConfiguration(key)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No configurations added yet.</p>
      )}
    </div>
  );
};

export default ProductConfiguration;
