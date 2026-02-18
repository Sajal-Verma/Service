import express from "express";
import { configDotenv } from "dotenv";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";


import connectToMongoDB from "./models/connection.js";
import userRoutes from "./routes/userRout.js";
import serviceRoutes from "./routes/servieRout.js";
import bookingRoutes from "./routes/bookingRout.js";



//connect to database
connectToMongoDB();



configDotenv();

const  app = express();
const PORT = process.env.PORT || 5000;
const server = createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



//middlewares
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === process.env.CLIENT_UR) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());


//routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/services", serviceRoutes);
app.use("/bookings", bookingRoutes);