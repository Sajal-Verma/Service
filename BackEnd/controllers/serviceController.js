import {
    createServiceService,
    getAllServicesService,
    getServiceByIdService,
    updateServiceService,
    deleteServiceService,
    getServiceByUserIdService,
} from "../services/serviceService.js";



export const createController = async (req, res) => {
    try {
        const newService = await createServiceService(req.body, req.user.id);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




export const getAllController = async (req, res) => {
    try {
        const services = await getAllServicesService();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const getControllerByUserId = async (req, res) => {
    try {
        const services = await getServiceByUserIdService(req.params.id);
        res.status(200).json(services);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};




export const getControllerById = async (req, res) => {
    try {
        const service = await getServiceByIdService(req.params.id);
        res.status(200).json(service);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const updateController = async (req, res) => {
    try {
        const updatedService = await updateServiceService(req.params.id, req.body);
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const deleteController = async (req, res) => {
    try {
        await deleteServiceService(req.params.id);
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
