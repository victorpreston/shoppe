import { Router } from "express";
import { 
    createNewOrder, 
    cancelUserOrder, 
    getUserOrdersController 
} from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, createNewOrder);

/**
 * New route for cancelling an order
 */
router.delete("/", authenticate, cancelUserOrder);

/**
 * getting user orders and all orders
 */
router.get("/", authenticate, getUserOrdersController);



export default router;