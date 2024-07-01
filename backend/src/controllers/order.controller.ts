import { Request, Response } from "express";
import { 
  createOrder, 
  cancelOrder, 
  getAllOrders, 
  getUserOrders 
} from "../services/order.service";
import { Role } from "../interfaces/role.enum";


/**
 * Controller to create a new order
 * @param req 
 * @param res 
 * @returns 
 */
const createNewOrder = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Extract the userId from the authenticated user

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const order = await createOrder(userId);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Controller to cancel an order
 * @param req 
 * @param res 
 * @returns 
 */
const cancelUserOrder = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  const userId = req.user?.id; // Extract the userId from the authenticated user

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const order = await cancelOrder(orderId, userId);
    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};



/**
 * Controller to get orders
 * @param req 
 * @param res 
 * @returns 
 */
const getUserOrdersController = async (req: Request, res: Response) => {
  const userId = req.user?.id; /**Extract the userId from the authenticated user */
  const userRole = req.user?.role; /**Extract the user role from the authenticated user */

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    if (userRole === Role.ADMIN) {
      /**
       * If the user is an admin, return all orders
       */
      const orders = await getAllOrders();
      res.status(200).json(orders);
    } else {
      /**
       * If the user is not an admin, return only their orders
       */
      const orders = await getUserOrders(userId);
      res.status(200).json(orders);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { createNewOrder, cancelUserOrder, getUserOrdersController};