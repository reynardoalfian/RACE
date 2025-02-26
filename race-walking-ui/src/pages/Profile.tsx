import React, { useEffect, useState } from "react";

// Define the expected structure of the user object
interface User {
  id: number;
  email: string;
  name?: string;
  profilePic?: string;
  totalProjects?: number;
  violationsDetected?: number;
  analysisTime?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null); // Set the correct type

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center">User Profile</h2>
      <p className="text-gray-600 text-center mt-1">View your race walking analysis stats</p>

      {/* User Info */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={user.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-300"
        />
        <h3 className="text-2xl font-semibold mt-3">{user.name || "N/A"}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Statistics */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-lg font-semibold">Total Projects Analyzed</span>
          <span className="text-xl">{user.totalProjects ?? 0}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-lg font-semibold">Violations Detected</span>
          <span className="text-xl">{user.violationsDetected ?? 0}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-lg font-semibold">Total Analysis Time</span>
          <span className="text-xl">{user.analysisTime ?? "N/A"}</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth"; // Redirect to login page
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
