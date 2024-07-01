import { User } from "./user.interface";
import { Product } from "./product.interface";

export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  user?: User;
  product?: Product;
}