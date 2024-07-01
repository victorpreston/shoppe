import { Request, Response } from "express";
import { 
  addToCart, 
  getCart, 
  removeFromCart 
} from "../services/cart.service";

/**
 * Controller to add product to cart and return detailed cart information
 * @param req 
 * @param res 
 * @returns 
 */
const addProductToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.id; /**Extract the userId from the authenticated user */

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const cart = await addToCart(userId, productId, quantity);
    res.status(201).json(cart);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to get user cart and return detailed cart information
 * @param req 
 * @param res 
 * @returns 
 */
const getUserCart = async (req: Request, res: Response) => {
  const userId = req.user?.id; /**Extract the userId from the authenticated user */

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const cart = await getCart(userId);
    res.json(cart);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to remove a product from the cart
 * @param req 
 * @param res 
 * @returns 
 */
const removeProductFromCart = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const userId = req.user?.id; /**Extract the userId from the authenticated user */

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const cart = await removeFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export { addProductToCart, getUserCart, removeProductFromCart };