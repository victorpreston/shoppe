import { Product } from "./product.interface";

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
}

/**
 * CartItem interface
 */