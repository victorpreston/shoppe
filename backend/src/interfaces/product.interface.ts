import { CartItem } from "./cartItem.interface";
import { OrderItem } from "./orderItem.interface";
import { Review } from "./review.interface";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stockQuantity: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  cartItems?: CartItem[];
  orderItems?: OrderItem[];
  reviews?: Review[];
}