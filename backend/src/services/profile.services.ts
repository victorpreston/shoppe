import prisma from "../config/database";
import bcrypt from "bcrypt";

/**
 * Function to get user profile
 * @param userId 
 * @returns 
 */
const getUserProfileService = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

/**
 * Function to update user profile
 * @param userId 
 * @param email 
 * @param name 
 * @returns 
 */
const updateUserProfileService = async (userId: number, email: string, name: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email, name },
    });
    return updatedUser;
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target.includes('email')) {
      throw new Error('A user with the same email already exists');
    }
    throw error;
  }
};

/**
 * Function to update user password
 * @param userId 
 * @param currentPassword 
 * @param newPassword 
 * @returns 
 */
const updateUserPasswordService = async (userId: number, currentPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
  return true;
};

export { getUserProfileService, updateUserProfileService, updateUserPasswordService };