import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

interface User {
  _id: string;
  first_name: string;
  email: string;
  role: number;
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [updatedRoles, setUpdatedRoles] = useState<{ [key: string]: number }>({}); // Track updated roles

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/users`);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (userId: string, newRole: number) => {
    console.log(`Role changed for userId: ${userId}, newRole: ${newRole}`);
    setUpdatedRoles(prev => ({
      ...prev,
      [userId]: newRole
    }));
  };

  const handleSaveRoles = async () => {
    console.log("Saving roles:", updatedRoles);

    try {
      const updatePromises = Object.keys(updatedRoles).map((userId) => {
        const newRole = updatedRoles[userId];
        // const requestBody = { userId, role: newRole };
        // console.log("Request body being sent to backend:", requestBody); 
        return axiosInstance.put(`/users/role/${userId}`, { role: newRole });
      });

      await Promise.all(updatePromises);
      console.log("User roles updated successfully");

      const response = await axiosInstance.get(`/users`);
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      }
      setUpdatedRoles({});
    } catch (error) {
      console.error("Failed to update user roles:", error);
      setError("Failed to update user roles");
    }
  };

  return (
    <div>
      <h2>Roles Management</h2>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td className="py-2">{user.first_name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">
                  <select
                    defaultValue={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, parseInt(e.target.value))
                    }
                  >
                    <option value={0}>Admin</option>
                    <option value={1}>Moderator</option>
                    <option value={2}>User</option>
                  </select>
                </td>
                <td className="py-2">
                  <button
                    onClick={handleSaveRoles}
                    className="ml-2 bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;