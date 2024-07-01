import { Role } from "./role.enum";
import { Cart } from "./cart.interface";
import { Order } from "./order.interface";
import { Review } from "./review.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  cart?: Cart;
  orders?: Order[];
  reviews?: Review[];
}