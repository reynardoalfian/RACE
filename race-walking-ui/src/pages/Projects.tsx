import React, { useState } from "react";
import ProjectPanel from "@/components/projects/ProjectPanel";

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
    },
    {
      id: 2,
      name: "Project 2",
      date: "2024-01-24",
      duration: "3:15",
      violations: 1,
      status: "Analyzed",
      videoUrl: "https://www.example.com/sample-video2.mp4",
    },
    {
      id: 3,
      name: "Project 3",
      date: "2024-01-23",
      duration: "1:45",
      violations: 0,
      status: "Processing",
      videoUrl: "https://www.example.com/sample-video3.mp4",
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  // Open the project panel
  const openProjectPanel = (project) => {
    setSelectedProject(project);
    setPanelOpen(true);
  };

  // Close the project panel
  const closeProjectPanel = () => {
    setPanelOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold">Your Projects</h2>

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
                {project.violations > 0 && <span>📊 {project.violations} violations</span>}
              </div>
            </div>
            {/* Status Button */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === "Analyzed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {project.status}
            </span>
          </div>
        ))}
      </div>

      {panelOpen && (
        <ProjectPanel project={selectedProject} onClose={closeProjectPanel} />
      )}
    </div>
  );
};

export default Projects;
