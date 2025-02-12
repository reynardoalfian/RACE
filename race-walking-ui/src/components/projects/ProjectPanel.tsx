import React, { useState } from "react";
import { projectSettingsConfig } from "@/config/projectSettings";

const ProjectPanel = ({ project, onClose, onSave }) => {
  if (!project) return null;

  // Local state for editable project name
  const [editableProject, setEditableProject] = useState({ ...project });

  // Check if editing is allowed (only when status is "Analyzed")
  const isEditable = project.status === "Analyzed";

  // Handle project name change
  const handleChange = (key, value) => {
    if (key === "name" && isEditable) {
      setEditableProject((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-2/3 h-4/5 p-6 rounded-lg shadow-lg overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          ✖ Close
        </button>

        {/* Editable Project Name */}
        <h2 className="text-2xl font-bold">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            value={editableProject.name}
            onChange={(e) => handleChange("name", e.target.value)}
            disabled={!isEditable}
          />
        </h2>

        {/* Read-Only Project Details */}
        <p className="text-gray-600 mt-2">📅 Created on: {editableProject.date}</p>
        <p className="text-gray-600">⏱ Duration: {editableProject.duration}</p>
        <p className="text-gray-600">📊 Violations: {editableProject.violations}</p>
        <p className="text-gray-600">
          <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              isEditable ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {editableProject.status}
          </span>
        </p>

        {!isEditable && (
          <p className="mt-4 text-red-600 text-sm font-medium">
            ⚠ Editing is disabled while the project is still processing.
          </p>
        )}

        {/* Video Display */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Uploaded Video</h3>
          <video controls className="w-full rounded-lg mt-2">
            <source src={editableProject.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Placeholder for Future Configurations */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Project Details</h3>
          <div className="mt-2 bg-gray-100 p-4 rounded-lg space-y-3">
            {projectSettingsConfig.options.map((setting, index) => (
              <div key={setting.key} className="flex flex-col">
                <label className="text-sm font-medium">{`Placeholder ${index + 1}`}</label>
                <input
                  type="text"
                  className="border px-3 py-2 rounded bg-gray-200 text-gray-500"
                  value={""} // Always empty for future configuration
                  disabled
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-3 py-2 rounded-lg">
            Close
          </button>
          <button
            onClick={() => isEditable && onSave(editableProject)}
            className={`px-3 py-2 rounded-lg ${
              isEditable ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
