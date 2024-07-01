import { Router } from "express";
import { 
    addProductToCart, 
    getUserCart, 
    removeProductFromCart 
} from "../controllers/cart.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, addProductToCart);
router.get("/", authenticate, getUserCart);
/**
 * Route to remove a product from the cart
 */
router.delete("/", authenticate, removeProductFromCart);

export default router;