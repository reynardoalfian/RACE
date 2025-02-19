import React, { useEffect, useState } from "react";

const AdminDashboard = ({ token }) => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const response = await fetch("http://localhost:5000/api/pending-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPendingUsers(data);
    };

    fetchPendingUsers();
  }, [token]);

  const approveUser = async (id) => {
    await fetch(`http://localhost:5000/api/approve-user/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setPendingUsers(pendingUsers.filter((user) => user.id !== id));
  };

  const makeAdmin = async (id) => {
    await fetch(`http://localhost:5000/api/make-admin/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold">Admin User Approvals</h2>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Email</th>
            <th className="border p-2">Approve</th>
            <th className="border p-2">Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button onClick={() => approveUser(user.id)} className="bg-green-500 text-white px-3 py-1 rounded">
                  Approve
                </button>
              </td>
              <td className="border p-2">
                <button onClick={() => makeAdmin(user.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
