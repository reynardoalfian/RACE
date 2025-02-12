import React, { useState } from "react";
import ProjectPanel from "@/components/projects/ProjectPanel";
import { projectSettingsConfig } from "@/config/projectSettings";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project 1",
      date: "2024-01-25",
      duration: "2:30",
      violations: 3,
      status: "Analyzed",
      videoUrl: "https://www.example.com/sample-video.mp4",
      lastAnalysis: "2024-01-26",
    },
    {
      id: 2,
      name: "Project 2",
      date: "2024-01-24",
      duration: "3:15",
      violations: 1,
      status: "Analyzed",
      videoUrl: "https://www.example.com/sample-video2.mp4",
      lastAnalysis: "2024-01-25",
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    settings: {},
    video: null,
  });

  // Open project panel
  const openProjectPanel = (project) => {
    setSelectedProject(project);
    setPanelOpen(true);
  };

  // Close project panel
  const closeProjectPanel = () => {
    setPanelOpen(false);
    setSelectedProject(null);
  };

  // Save project settings
  const saveProjectSettings = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    closeProjectPanel();
  };

  // Start new project creation
  const startNewProject = () => {
    setIsCreating(true);
  };

  // Cancel new project creation
  const cancelNewProject = () => {
    setIsCreating(false);
    setNewProject({ name: "", settings: {}, video: null });
  };

  // Handle input changes
  const handleInputChange = (key, value) => {
    setNewProject((prev) => ({
      ...prev,
      settings: { ...prev.settings, [key]: value },
    }));
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProject((prev) => ({ ...prev, video: URL.createObjectURL(file) }));
    }
  };

  // Check if all fields are filled
  const isFormComplete =
    newProject.name.trim() !== "" &&
    newProject.video !== null &&
    Object.keys(newProject.settings).length === projectSettingsConfig.options.length &&
    Object.values(newProject.settings).every((val) => val.trim() !== "");

  // Create new project
  const saveNewProject = () => {
    if (!isFormComplete) return;
    const newProjectData = {
      id: projects.length + 1,
      name: newProject.name,
      date: new Date().toISOString().split("T")[0], // Get today's date
      duration: "--:--",
      violations: 0,
      status: "Processing",
      videoUrl: newProject.video,
      lastAnalysis: "N/A",
    };
    setProjects([...projects, newProjectData]);
    setNewProject({ name: "", settings: {}, video: null });
    setIsCreating(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Your Projects</h2>
        <button
          onClick={startNewProject}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + New Project
        </button>
      </div>

      {/* New Project Form */}
      {isCreating && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Create New Project</h3>

          {/* Project Name */}
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

          {/* Video Upload */}
          <div className="mt-4">
            <label className="text-sm font-medium">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              className="border px-3 py-2 rounded w-full mt-1"
              onChange={handleFileUpload}
            />
          </div>

          {/* Video Preview */}
          {newProject.video && (
            <video controls className="w-full rounded-lg mt-2">
              <source src={newProject.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Buttons */}
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={cancelNewProject} className="bg-gray-500 text-white px-3 py-2 rounded-lg">
              Cancel
            </button>
            <button
              onClick={saveNewProject}
              className={`px-3 py-2 rounded-lg ${
                isFormComplete ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!isFormComplete}
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* List of Projects */}
      <div className="mt-6 space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-100"
            onClick={() => openProjectPanel(project)}
          >
            <div>
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <div className="text-gray-500 flex space-x-4 text-sm mt-1">
                <span>📅 {project.date}</span>
                <span>⏱ {project.duration}</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">{project.status}</span>
          </div>
        ))}
      </div>

      {panelOpen && <ProjectPanel project={selectedProject} onClose={closeProjectPanel} onSave={saveProjectSettings} />}
    </div>
  );
};

export default Projects;
