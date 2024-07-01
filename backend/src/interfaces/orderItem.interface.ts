import { Product } from "./product.interface";

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  product: Product;
}