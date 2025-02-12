import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { projectSettingsConfig } from "@/config/projectSettings";

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", settings: {} });

  // Handle file selection
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile)); // Create preview
      setIsUploading(true); // Show project setup modal
    }
  };

  // Handle input changes for project settings
  const handleInputChange = (key, value) => {
    setNewProject((prev) => ({
      ...prev,
      settings: { ...prev.settings, [key]: value },
    }));
  };

  // Save new project and navigate to Projects page
  const createProject = () => {
    if (!newProject.name.trim()) return;

    // Store project (You can integrate API storage here)
    const projectData = {
      id: Date.now(),
      name: newProject.name,
      date: new Date().toISOString().split("T")[0], // Current date
      duration: "--:--",
      violations: 0,
      status: "Processing",
      videoUrl: file,
      lastAnalysis: "N/A",
    };

    console.log("New Project Created:", projectData);

    // Redirect to projects page (modify if needed)
    navigate("/projects");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center">
        Race Walking Analysis & Compliance Evaluation
      </h1>
      <p className="text-lg text-gray-600 mt-2 text-center max-w-xl">
        Analyze race walking footage in real-time to ensure rule compliance and improve athlete performance
      </p>

      {/* Upload Video Section */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <div className="text-gray-500 text-3xl">⬆</div>
        <h2 className="text-xl font-semibold mt-2">Upload Your Video</h2>
        <p className="text-gray-600 text-sm">Drag and drop your video or click to browse</p>

        <div className="border border-gray-300 rounded-md p-4 mt-4">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            id="videoUpload"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="videoUpload"
            className="block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
          >
            Choose File
          </label>
        </div>

        <p className="text-gray-400 text-xs mt-2">MP4 File Format Supported</p>
      </div>

      {/* Feature Icons */}
      <div className="flex justify-center space-x-10 mt-8">
        <div className="text-center">
          <div className="text-2xl">⏱</div>
          <p className="text-sm font-medium mt-1">Real-Time Analysis</p>
        </div>
        <div className="text-center">
          <div className="text-2xl">📏</div>
          <p className="text-sm font-medium mt-1">Rule Compliance</p>
        </div>
        <div className="text-center">
          <div className="text-2xl">📊</div>
          <p className="text-sm font-medium mt-1">Performance Tracking</p>
        </div>
      </div>

      {/* Project Setup Modal */}
      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Create New Project</h3>
            <input
              type="text"
              className="border px-3 py-2 rounded w-full mt-2"
              placeholder="Enter project name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />

            {/* Placeholder Settings */}
            <div className="mt-4 bg-gray-100 p-4 rounded-lg space-y-3">
              {projectSettingsConfig.options.map((setting, index) => (
                <div key={setting.key} className="flex flex-col">
                  <label className="text-sm font-medium">{`Placeholder ${index + 1}`}</label>
                  <input
                    type="text"
                    className="border px-3 py-2 rounded"
                    placeholder={`Enter Placeholder ${index + 1}`}
                    value={newProject.settings[setting.key] || ""}
                    onChange={(e) => handleInputChange(setting.key, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsUploading(false)}
                className="bg-gray-500 text-white px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
                disabled={!newProject.name.trim()}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
