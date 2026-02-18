import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const ServiceCard = ({ service, onBook }) => {
    const { user } = useContext(AuthContext);
    return (
        <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold text-purple-900 capitalize mb-2">
                {service.serviceName}
            </h4>

            <p className="text-gray-600 mb-4">
                {service.description}
            </p>

            <div className="flex justify-between items-center">
                <span className="text-indigo-600 font-bold text-lg">
                    ₹{service.baseprice}
                </span>
                {user.role === "service_provider" ? (
                    <button
                        type="button"
                        onClick={() => {
                            console.log("Button clicked", service._id);
                            onBook(service._id);
                        }}
                        className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg"
                    >
                        update
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            console.log("Button clicked", service._id);
                            onBook(service._id);
                        }}
                        className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg"
                    >
                        Book
                    </button>
                )}
            </div>
        </div>
    );
};

export default ServiceCard;
