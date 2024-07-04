import prisma from "../config/database";

/**
 * Function to get all users
 * @returns 
 */
const getAllUsersService = async () => {
  return await prisma.user.findMany({
    include: {
      orders: true,
      reviews: true,
    },
  });
};

/**
 * Function to delete a user
 * @param userId 
 * @returns 
 */
const deleteUserService = async (userId: number) => {
  await prisma.user.delete({
    where: { id: userId },
  });
};

export { getAllUsersService, deleteUserService };