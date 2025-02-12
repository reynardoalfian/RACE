import React, { useState } from "react";

export default function Profile() {  // ✅ Ensure 'export default' is used
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    profilePic: "https://via.placeholder.com/100",
    totalProjects: 2,
    violationsDetected: 5,
    analysisTime: "4 hours 30 minutes",
  });

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center">User Profile</h2>
      <p className="text-gray-600 text-center mt-1">View your race walking analysis stats</p>

      {/* User Info */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-300"
        />
        <h3 className="text-2xl font-semibold mt-3">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Statistics */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-lg font-semibold">Total Projects Analyzed</span>
          <span className="text-xl">{user.totalProjects}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-lg font-semibold">Violations Detected</span>
          <span className="text-xl">{user.violationsDetected}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-lg font-semibold">Total Analysis Time</span>
          <span className="text-xl">{user.analysisTime}</span>
        </div>
      </div>
    </div>
  );
}
