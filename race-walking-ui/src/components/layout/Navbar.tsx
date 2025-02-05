// src/components/layout/Navbar.tsx
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">R.A.C.E</Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <Link to="/projects" className="hover:text-blue-600">Projects</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/auth" className="hover:text-blue-600">Login</Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-blue-600"
            >
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4">
            <Link to="/projects" className="text-blue-600 hover:text-blue-800">Projects</Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-800">About</Link>
            <Link to="/auth" className="text-blue-600 hover:text-blue-800">Login</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
