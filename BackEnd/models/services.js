import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserService",
        required: true
    },
    serviceName: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    baseprice: {
        type: Number,
        required: true
    },
    tax: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Service = mongoose.model("ServiceService", serviceSchema);
export default Service;