// src/components/layout/Navbar.tsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">R.A.C.E</Link>
        <div className="flex gap-6">
          <Link to="/projects" className="hover:text-blue-600">Projects</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/auth" className="hover:text-blue-600">Login</Link>
        </div>
      </div>
    </nav>
  );
}
