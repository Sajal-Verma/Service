import express from 'express';
import { registerUser, loginUser, logUserOut , getUserById , updateUser, deleteUser} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logUserOut);

router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);


export default router;