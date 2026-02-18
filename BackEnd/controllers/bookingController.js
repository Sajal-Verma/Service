import {
    createBookingService,
    getAllBookingsService,
    getBookingByIdService,
    updateBookingService,
    deleteBookingService,
    getBookingsByUserIdService,
} from "../services/bookingService.js";



export const createController = async (req, res) => {
    try {
        const booking = await createBookingService(req.body, req.user.id);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const getAllController = async (req, res) => {
    try {
        const bookings = await getAllBookingsService();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getControllerById = async (req, res) => {
    try {
        const booking = await getBookingByIdService(req.params.id);
        res.status(200).json(booking);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



export const getBookingsByUserId = async (req, res) => {
    try {
        const bookings = await getBookingsByUserIdService(req.params.id);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



export const updateController = async (req, res) => {
    try {
        const updatedBooking = await updateBookingService(req.params.id, req.body);
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const deleteController = async (req, res) => {
    try {
        await deleteBookingService(req.params.id);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
