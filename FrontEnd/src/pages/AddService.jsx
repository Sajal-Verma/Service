import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const AddService = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    basePrice: "",
    tax: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user: user.id,
      serviceName: form.serviceName,
      description: form.description,
      baseprice: Number(form.basePrice),
      tax: Number(form.tax),
    };

    try {
      setLoading(true);
      await api.post("/services", payload);
      alert("Service added successfully");
      setForm({
        serviceName: "",
        description: "",
        basePrice: "",
        tax: "",
        isActive: true,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg border border-indigo-100 p-6">
        <h2 className="text-2xl font-bold text-purple-900 text-center mb-6">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              required
              value={form.serviceName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              required
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Base Price */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Base Price (₹ / hour)
            </label>
            <input
              type="number"
              name="basePrice"
              required
              value={form.basePrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Tax */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Tax (%)
            </label>
            <input
              type="number"
              name="tax"
              value={form.tax}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700">Active Service</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-900 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
