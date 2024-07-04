import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} from "../controllers/profile.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, getUserProfile);
router.put("/", authenticate, updateUserProfile);
router.put("/password", authenticate, updateUserPassword);

export default router;