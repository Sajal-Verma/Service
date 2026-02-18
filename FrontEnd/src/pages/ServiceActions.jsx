import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ServiceActions = () => {
  const { id } = useParams(); // service id from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    basePrice: "",
    tax: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        const s = res.data;
        setForm({
          serviceName: s.serviceName,
          description: s.description,
          basePrice: s.baseprice,
          tax: s.tax,
          isActive: s.isActive,
        });
      } catch {
        alert("Service not found");
        navigate("/");
      }
    };

    fetchService();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      serviceName: form.serviceName,
      description: form.description,
      baseprice: Number(form.basePrice),
      tax: Number(form.tax),
      isActive: form.isActive,
    };

    try {
      setLoading(true);
      await api.put(`/services/${id}`, payload);
      alert("Service updated successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await api.delete(`/services/${id}`);
      alert("Service deleted successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg border border-indigo-100 p-6">
        <h2 className="text-2xl font-bold text-purple-900 text-center mb-6">
          Update / Delete Service
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              value={form.serviceName}
              onChange={handleChange}
              required
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
              value={form.description}
              onChange={handleChange}
              required
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
              value={form.basePrice}
              onChange={handleChange}
              required
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

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-900 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-800 hover:bg-red-600 text-white py-2 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceActions;
