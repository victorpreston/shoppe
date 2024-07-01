import prisma from "../config/database";

/**
 * Check if the product exists before adding to the cart
 * @param userId 
 * @param productId 
 * @param quantity 
 * @returns 
 */
const addToCart = async (userId: number, productId: number, quantity: number) => {
  /**
   * Check if the product exists before adding to the cart
   */
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new Error("Product with that ID does not exist");
  }

  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        items: {
          create: {
            productId,
            quantity
          }
        }
      },
      include: {
        items: {
          include: {
            product: true /**Include product details in cart items */
          }
        }
      }
    });
  } else {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId }
    });

    if (existingCartItem) {
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      });
    }

    cart = await prisma.cart.findUnique({
      where: { id: cart.id },
      /**
       * Include product details in cart items
       */
      include: { items: { include: { product: true } } }
    });
  }

  return cart;
};

/**
 *  Include product details in the cart items returned
 * @param userId 
 * @returns 
 */
const getCart = async (userId: number) => {
  return await prisma.cart.findUnique({
    where: { userId },
    /**
     * Include product details in cart items
     */
    include: { items: { include: { product: true } } } 
  });
};

/**
 * Function to remove an item from the cart
 * @param userId 
 * @param productId 
 * @returns 
 */
const removeFromCart = async (userId: number, productId: number) => {
  /**
   * Find the cart for the user
   */
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true }
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  /**Find the cart item to remove */
  const cartItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId }
  });

  if (!cartItem) {
    throw new Error("Product not found in cart");
  }

  /**Remove the cart item */
  await prisma.cartItem.delete({
    where: { id: cartItem.id }
  });

  /**Return the updated cart */
  return await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  });
};

export { addToCart, getCart, removeFromCart };