import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import MyBookings from "../pages/MyBookings";
import AddService from "../pages/AddService";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const id = user.id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/users/${id}`, { withCredentials: true });
      setForm({
        name: res.data.name,
        email: res.data.email,
        role: res.data.role
      });
      setLoading(false);
    } catch {
      handleLogout();
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateUser = async () => {
    try {
      await api.put(`/users/${id}`, form, { withCredentials: true });
      alert("Profile Updated Successfully");
      fetchUser();
    } catch {
      alert("Update failed");
    }
  };

  const deleteUser = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/users/${id}`, { withCredentials: true });
      handleLogout();
      navigate("/register");
    } catch {
      alert("Delete failed");
    }
  };

  const handleLogout = async () => {
    await api.post("/users/logout", {}, { withCredentials: true });
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 py-10 px-4">
      {/* Profile Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-900">
            User Dashboard
          </h2>

          <button
            onClick={handleLogout}
            className="text-sm text-white rounded-lg bg-red-800 px-2 py-1 hover:text-red-300 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-900 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-purple-900 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={updateUser}
            className="flex-1 bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Update Profile
          </button>

          <button
            onClick={deleteUser}
            className="flex-1 bg-red-800 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Bookings Section */}
      {user.role === "customer" && (
        <div className="max-w-5xl mx-auto mt-10">
          <MyBookings />
        </div>
      )}

      {/* Bookings Section */}
      {user.role === "service_provider" && (
          <AddService />
      )}
    </div>
  );
};

export default UserDashboard;
