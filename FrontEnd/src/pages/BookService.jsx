import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`, {
          withCredentials: true
        });
        setService(res.data);
      } catch {
        setError("Service not found");
      }
    };

    fetchService();
  }, [id]);

  const calculateTotal = () => {
    if (!service) return 0;
    const base = service.baseprice * hours;
    const taxAmount = service.tax ? (base * service.tax) / 100 : 0;
    return base + taxAmount;
  };

  const book = async () => {
    if (hours < 1) {
      alert("Hours must be at least 1");
      return;
    }

    const bookingData = {
      user: user.id,
      service: id,
      bookingDate: new Date(),
      totalPrice: calculateTotal()
    };

    try {
      setLoading(true);
      await api.post("/bookings", bookingData, {
        withCredentials: true
      });
      alert("Booked successfully");
      navigate("/my-bookings");
    } catch {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading service...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 w-full max-w-md p-6">

        {/* Title */}
        <h2 className="text-3xl font-bold text-purple-900 mb-2 text-center capitalize">
          {service.serviceName}
        </h2>

        <p className="text-gray-600 mb-6 text-center">
          {service.description}
        </p>

        {/* Pricing */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
          <p className="text-purple-900 font-medium">
            Base Price: ₹{service.baseprice} / hour
          </p>

          {service.tax && (
            <p className="text-gray-600">
              Tax: {service.tax}%
            </p>
          )}

          <p className="font-bold text-lg text-purple-900 mt-2">
            Total: ₹{calculateTotal()}
          </p>
        </div>

        {/* Hours */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-purple-900 mb-1">
            Hours Required
          </label>
          <input
            type="number"
            min="1"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={book}
          disabled={loading}
          className="w-full bg-purple-900 hover:bg-purple-700
                     text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookService;
