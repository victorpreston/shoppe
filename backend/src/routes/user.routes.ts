import { Router } from "express";
import { 
    register, 
    login, 
    resetUserPassword 
} from "../controllers/user.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetUserPassword);

export default router;