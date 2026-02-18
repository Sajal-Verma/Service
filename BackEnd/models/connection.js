import { configDotenv } from "dotenv";
import mongoose from "mongoose";


configDotenv();
export const mongoUrl = process.env.mongoUrl;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectToMongoDB;