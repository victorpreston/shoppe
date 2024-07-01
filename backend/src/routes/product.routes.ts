import { Router } from "express";
import { 
    createProduct, 
    getProducts, 
    getProduct, 
    updateExistingProduct, 
    deleteExistingProduct 
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { Role } from "../interfaces/role.enum";
// import upload from "../config/multer"; /**Import Multer for file upload */


const router = Router();

// router.post("/", authenticate, authorize([Role.ADMIN]), upload.single('image'), createProduct); /**Add Multer middleware to the route */

router.post("/", authenticate, authorize([Role.ADMIN]), createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", authenticate, authorize([Role.ADMIN]), updateExistingProduct);
router.delete("/:id", authenticate, authorize([Role.ADMIN]), deleteExistingProduct);

export default router;