// src/pages/Home.tsx
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold mb-4">
        Race Walking Analysis & Compliance Evaluation
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
        Upload your race walking videos for instant rule compliance analysis
      </p>
      <Link 
        to="/projects" 
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Get Started
      </Link>
    </div>
  )
}
