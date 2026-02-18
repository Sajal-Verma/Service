import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(`/bookings/my/${user.id}`, {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-purple-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Booking Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Total Price</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="px-4 py-3 text-gray-700">
                    {b.service?.serviceName || "—"}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        b.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : b.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    ₹{b.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
