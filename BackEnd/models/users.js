import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lwercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["customer", "service_provider", "admin"],
        default: "customer"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model("UserService", userSchema);
export default User;