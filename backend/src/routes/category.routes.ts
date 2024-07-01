import { Router } from "express";
import { 
    createCategory, 
    getCategories, 
    removeCategory, 
    updateCategoryController
} from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { Role } from "../interfaces/role.enum";


const router = Router();

router.post("/", authenticate, authorize([Role.ADMIN]), createCategory);
router.get("/", getCategories);
router.delete("/:id", authenticate, authorize([Role.ADMIN]), removeCategory);
router.put("/:id", authenticate, authorize([Role.ADMIN]), updateCategoryController);


export default router;