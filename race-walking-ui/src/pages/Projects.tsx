// src/pages/Projects.tsx
export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          New Project
        </button>
      </div>
      {/* Project list will go here */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Project cards will go here */}
      </div>
    </div>
  )
}
