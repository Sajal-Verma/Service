import { createController , getAllController ,getControllerById,updateController ,deleteController ,getControllerByUserId} from "../controllers/serviceController.js";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/",authMiddleware, getAllController);
router.get("/:id",authMiddleware,getControllerById);

router.get("/my/:id", authMiddleware, roleMiddleware("service_provider"), getControllerByUserId);
router.post("/", authMiddleware, roleMiddleware("service_provider"), createController);
router.put("/:id", authMiddleware, roleMiddleware("service_provider"), updateController);
router.delete("/:id", authMiddleware, roleMiddleware("service_provider"), deleteController);

export default router;