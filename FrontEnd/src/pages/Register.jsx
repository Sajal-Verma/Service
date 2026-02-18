import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/users/register",
        form,
        { withCredentials: true }
      );

      login(res.data.user);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border border-indigo-100 p-6">

        {/* Header */}
        <h2 className="text-3xl font-bold text-purple-900 text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Create a password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="customer">Customer</option>
              <option value="service_provider">Service Provider</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-900 hover:bg-purple-700
                       text-white py-2 rounded-lg font-medium transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Join us and start booking services today
        </p>
      </div>
    </div>
  );
};

export default Register;
