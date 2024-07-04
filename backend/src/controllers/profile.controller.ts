import { Request, Response } from "express";
import { getUserProfileService, updateUserProfileService, updateUserPasswordService } from "../services/profile.services";

/**
 * Controller to get user profile
 * @param req 
 * @param res 
 */
const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const profile = await getUserProfileService(userId);
    res.status(200).json(profile);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to update user profile
 * @param req 
 * @param res 
 */
const updateUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { email, name } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const profile = await updateUserProfileService(userId, email, name);
    res.status(200).json(profile);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to update user password
 * @param req 
 * @param res 
 */
// const updateUserPassword = async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   const { currentPassword, newPassword } = req.body;

//   if (!userId) {
//     return res.status(401).json({ error: "User not authenticated" });
//   }

//   try {
//     const success = await updateUserPasswordService(userId, currentPassword, newPassword);
//     res.status(200).json({ success });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

const updateUserPassword = async (req: Request, res: Response) => {
  console.log("Update Password Request:", req.body);
  const userId = req.user?.id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const success = await updateUserPasswordService(userId, currentPassword, newPassword);
    res.status(200).json({ success });
  } catch (error: any) {
    console.error("Error updating password:", error);
    res.status(400).json({ error: error.message });
  }
};

export { getUserProfile, updateUserProfile, updateUserPassword };