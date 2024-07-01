import { OrderItem } from "./orderItem.interface";

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  createdAt: Date;
}

export { OrderItem }; 

/**
 * Explicitly export OrderItem
 */