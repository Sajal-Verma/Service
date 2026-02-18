import Booking from "../models/bookings.js";
import mongoose from "mongoose";

export const createBookingService = async (bookingData, userId) => {
    try {
        const booking = await Booking.create({
            ...bookingData,
            user: userId,
        });
        return booking;
    } catch (error) {
        throw new Error("Error creating booking: " + error.message);
    }
};

export const getAllBookingsService = async () => {
    try {
        return await Booking.find()
            .populate("user", "name email")
            .populate("service")
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new Error("Error fetching bookings: " + error.message);
    }
};

export const getBookingByIdService = async (bookingId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            throw new Error("Invalid booking ID");
        }

        const booking = await Booking.findById(bookingId)
            .populate("user", "name email")
            .populate("service");

        if (!booking) {
            throw new Error("Booking not found");
        }

        return booking;
    } catch (error) {
        throw new Error("Error fetching booking: " + error.message);
    }
};

export const getBookingsByUserIdService = async (userId) => {
    try {
        return await Booking.find({ user: userId })
            .populate("service")
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new Error("Error fetching user bookings: " + error.message);
    }
};

export const updateBookingService = async (bookingId, updateData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            throw new Error("Invalid booking ID");
        }

        const allowedUpdates = ["status", "scheduledDate", "notes"];
        const filteredData = {};

        allowedUpdates.forEach(key => {
            if (updateData[key] !== undefined) {
                filteredData[key] = updateData[key];
            }
        });

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            filteredData,
            { new: true }
        )
            .populate("user", "name email")
            .populate("service");

        if (!updatedBooking) {
            throw new Error("Booking not found");
        }

        return updatedBooking;
    } catch (error) {
        throw new Error("Error updating booking: " + error.message);
    }
};

export const deleteBookingService = async (bookingId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            throw new Error("Invalid booking ID");
        }

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            throw new Error("Booking not found");
        }

        return deletedBooking;
    } catch (error) {
        throw new Error("Error deleting booking: " + error.message);
    }
};
