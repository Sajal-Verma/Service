import { createController , getAllController, getControllerById , updateController,deleteController , getBookingsByUserId } from "../controllers/bookingController.js";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllController);
router.get("/:id", authMiddleware, getControllerById);
router.get("/my/:id", authMiddleware, getBookingsByUserId);

router.post("/", authMiddleware, roleMiddleware("customer"), createController);

//for the admin 
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateController);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteController);

export default router;