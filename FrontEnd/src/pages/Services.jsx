import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ServiceCard from "../components/ServiceCard";
import { AuthContext } from "../context/AuthContext";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const fetchServicesBytheId = async () => {
    try {
      const res = await api.get(`/services/my/${user.id}`, {
        withCredentials: true
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.services;

      setServices(data.filter((s) => s.isActive));
    } catch (err) {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };


  const fetchServices = async () => {
    try {
      const res = await api.get(`/services`, {
        withCredentials: true
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.services;

      setServices(data.filter((s) => s.isActive));
    } catch (err) {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.role === "service_provider"){
      fetchServicesBytheId();
    }else{
      fetchServices();
    }
  }, []);


  const handleBook = (id) => {
    if(user.role === "service_provider"){
      navigate(`/services/${id}/edit`);
    }else{
      navigate(`/book/${id}`);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading services...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-indigo-50 p-6">
      <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
        Available Services
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {services.map((s) => (
          <ServiceCard
            key={s._id}
            service={s}
            onBook={handleBook}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
