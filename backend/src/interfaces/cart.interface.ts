import { CartItem } from "./cartItem.interface";

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}

/**
 * CartItem interface
 */