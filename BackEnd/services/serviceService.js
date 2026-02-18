import Service from "../models/services.js";
import mongoose from "mongoose";

export const createServiceService = async (serviceData, userId) => {
    try {
        const newService = await Service.create({
            ...serviceData,
            user: userId,
        });
        return newService;
    } catch (error) {
        throw new Error("Error creating service: " + error.message);
    }
};

export const getAllServicesService = async () => {
    try {
        return await Service.find();
    } catch (error) {
        throw new Error("Error fetching services: " + error.message);
    }
};

export const getServiceByIdService = async (serviceId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            throw new Error("Invalid service ID");
        }

        const service = await Service.findById(serviceId);
        if (!service) {
            throw new Error("Service not found");
        }

        return service;
    } catch (error) {
        throw new Error("Error fetching service: " + error.message);
    }
};

export const getServiceByUserIdService = async (userId) => {
    try {
        const services = await Service.find({ user: userId });

        if (services.length === 0) {
            throw new Error("No services found for this user");
        }

        return services;
    } catch (error) {
        throw new Error("Error fetching service: " + error.message);
    }
};

export const updateServiceService = async (serviceId, updateData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            throw new Error("Invalid service ID");
        }

        const allowedUpdates = [
            "serviceName",
            "description",
            "basePrice",
            "tax",
            "isActive",
        ];

        const filteredData = {};
        allowedUpdates.forEach(key => {
            if (updateData[key] !== undefined) {
                filteredData[key] = updateData[key];
            }
        });

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            filteredData,
            { new: true }
        );

        if (!updatedService) {
            throw new Error("Service not found");
        }

        return updatedService;
    } catch (error) {
        throw new Error("Error updating service: " + error.message);
    }
};

export const deleteServiceService = async (serviceId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            throw new Error("Invalid service ID");
        }

        const deletedService = await Service.findByIdAndDelete(serviceId);
        if (!deletedService) {
            throw new Error("Service not found");
        }

        return deletedService;
    } catch (error) {
        throw new Error("Error deleting service: " + error.message);
    }
};
