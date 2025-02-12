import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // User Profile Icon
import { HiMenu } from "react-icons/hi"; // Menu Icon

const Navbar = () => {
  const location = useLocation(); // Get current route

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-md bg-white">
      {/* Clickable Logo (Navigates to Home) */}
      <Link to="/" className="text-3xl font-bold tracking-wide hover:text-gray-700 transition">
        R.A.C.E
      </Link>

      {/* Centered Nav Links */}
      <div className="flex space-x-12 text-lg font-medium">
        <Link
          to="/projects"
          className={`pb-1 transition ${
            isActive("/projects") ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black"
          }`}
        >
          Projects
        </Link>
        <Link
          to="/"
          className={`pb-1 transition ${
            isActive("/") ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black"
          }`}
        >
          Welcome
        </Link>
        <Link
          to="/about"
          className={`pb-1 transition ${
            isActive("/about") ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black"
          }`}
        >
          About us
        </Link>
      </div>

      {/* Profile Icon & Menu */}
      <div className="flex items-center space-x-6">
        <Link to="/profile">
          <FaUserCircle
            className={`text-3xl cursor-pointer transition ${
              isActive("/profile") ? "text-black" : "text-gray-500 hover:text-black"
            }`}
          />
        </Link>
        <HiMenu className="text-3xl cursor-pointer hover:text-gray-700" />
      </div>
    </nav>
  );
};

export default Navbar;
