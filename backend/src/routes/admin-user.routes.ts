import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/admin-user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { Role } from "../interfaces/role.enum";

const router = Router();

router.get("/", authenticate, authorize([Role.ADMIN]), getAllUsers);
router.delete("/:userId", authenticate, authorize([Role.ADMIN]), deleteUser);

export default router;