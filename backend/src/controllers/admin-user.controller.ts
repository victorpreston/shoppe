import { Request, Response } from "express";
import { getAllUsersService, deleteUserService } from "../services/admin-user.service";

/**
 * Controller to get all users
 * @param req 
 * @param res 
 */
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to delete a user
 * @param req 
 * @param res 
 */
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await deleteUserService(parseInt(userId));
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAllUsers, deleteUser };