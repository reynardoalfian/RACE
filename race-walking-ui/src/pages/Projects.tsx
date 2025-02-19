import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

import "datatables.net";
import ProjectPanel from "@/components/projects/ProjectPanel";

const Projects = () => {
  const tableRef = useRef(null);
  const [projects, setProjects] = useState([
    { id: 1, name: "Project 1", date: "2024-01-25", duration: "2:30", violations: 3, status: "Analyzed", videoUrl: "https://www.example.com/sample-video.mp4" },
    { id: 2, name: "Project 2", date: "2024-01-24", duration: "3:15", violations: 1, status: "Analyzed", videoUrl: "https://www.example.com/sample-video2.mp4" },
    { id: 3, name: "Project 3", date: "2024-01-23", duration: "1:45", violations: 0, status: "Processing", videoUrl: "https://www.example.com/sample-video3.mp4" },
    { id: 4, name: "Project 4", date: "2024-01-22", duration: "2:10", violations: 2, status: "Processing", videoUrl: "https://www.example.com/sample-video4.mp4" },
    { id: 5, name: "Project 5", date: "2024-01-21", duration: "2:50", violations: 4, status: "Analyzed", videoUrl: "https://www.example.com/sample-video5.mp4" },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", video: null });

  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable({
        paging: true, // Enable pagination
        searching: true, // Enable search bar
        ordering: true, // Enable sorting
        pageLength: 5, // Default rows per page
        destroy: true, // Prevent re-initialization issues
      });
    }
  }, [projects]);

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

  // Open new project form
  const startNewProject = () => setIsCreating(true);
  
  // Cancel new project creation
  const cancelNewProject = () => {
    setIsCreating(false);
    setNewProject({ name: "", video: null });
  };

  // Handle input changes
  const handleInputChange = (key, value) => {
    setNewProject((prev) => ({ ...prev, [key]: value }));
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProject((prev) => ({ ...prev, video: URL.createObjectURL(file) }));
    }
  };

  // Save new project
  const saveNewProject = () => {
    if (!newProject.name.trim() || !newProject.video) return;

    const newProjectData = {
      id: projects.length + 1,
      name: newProject.name,
      date: new Date().toISOString().split("T")[0],
      duration: "--:--",
      violations: 0,
      status: "Processing",
      videoUrl: newProject.video,
    };

    setProjects([...projects, newProjectData]);
    setNewProject({ name: "", video: null });
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
          <input
            type="text"
            className="border px-3 py-2 rounded w-full mt-2"
            placeholder="Enter project name"
            value={newProject.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <div className="mt-4">
            <label className="text-sm font-medium">Upload Video</label>
            <input type="file" accept="video/*" className="border px-3 py-2 rounded w-full mt-1" onChange={handleFileUpload} />
          </div>
          {newProject.video && (
            <video controls className="w-full rounded-lg mt-2">
              <source src={newProject.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={cancelNewProject} className="bg-gray-500 text-white px-3 py-2 rounded-lg">Cancel</button>
            <button
              onClick={saveNewProject}
              className={`px-3 py-2 rounded-lg ${newProject.name && newProject.video ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
              disabled={!newProject.name || !newProject.video}
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* DataTables Project List */}
      <div className="mt-6 overflow-x-auto">
        <table ref={tableRef} className="display w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Project Name</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Duration</th>
              <th className="border border-gray-300 p-2">Violations</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => openProjectPanel(project)}>
                <td className="border border-gray-300 p-2">{project.name}</td>
                <td className="border border-gray-300 p-2">{project.date}</td>
                <td className="border border-gray-300 p-2">{project.duration}</td>
                <td className="border border-gray-300 p-2">{project.violations}</td>
                <td className={`border border-gray-300 p-2 text-sm font-medium text-center ${project.status === "Analyzed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {project.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {panelOpen && <ProjectPanel project={selectedProject} onClose={closeProjectPanel} />}
    </div>
  );
};

export default Projects;
