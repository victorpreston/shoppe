import prisma from "../config/database";
import { Order } from "../interfaces/order.interface";


/**
 * Function to create a new order
 * @param userId 
 * @returns 
 */
const createOrder = async (userId: number): Promise<Order> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderItems = cart.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity
  }));

  const total = cart.items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

  const newOrder = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: orderItems
      }
    },
    include: { items: { include: { product: true } } }
  });

  /**
   * Clear the cart after creating the order
   */
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return newOrder;
};



/**
 * Function to cancel an order
 * @param orderId 
 * @param userId 
 * @returns 
 */
const cancelOrder = async (orderId: number, userId: number) => {
  // Find the order
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true }
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Check if the order belongs to the user
  if (order.userId !== userId) {
    throw new Error("Unauthorized to cancel this order");
  }

  // Restore the product quantities
  for (const item of order.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stockQuantity: { increment: item.quantity } }
    });
  }

  // Delete the order items first
  await prisma.orderItem.deleteMany({
    where: { orderId: order.id }
  });

  // Delete the order
  await prisma.order.delete({
    where: { id: orderId }
  });

  return order;
};


/**
 * Function to get all orders for a user
 * @param userId 
 * @returns 
 */
const getUserOrders = async (userId: number) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } }
  });
  return orders;
};

/**
 * Function to get all orders (admin only)
 */
const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } }
  });
  return orders;
};


export { createOrder, cancelOrder, getUserOrders, getAllOrders};