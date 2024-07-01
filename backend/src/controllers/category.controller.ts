import { Request, Response } from "express";
import { 
  addCategory, 
  getAllCategories, 
  deleteCategory, 
  updateCategory 
} from "../services/category.service";

/**
 * createCategory
 * @param req 
 * @param res 
 */
const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await addCategory(name);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * getCategories
 * @param req 
 * @param res 
 */
const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * updateCategory
 * @param req 
 * @param res 
 */
const updateCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await updateCategory(parseInt(id, 10), name);
    res.status(200).json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * deleteCategory
 * @param req 
 * @param res 
 */
const removeCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await deleteCategory(parseInt(id, 10));
    res.status(200).json(category);
  } catch (error: any) {
    if (error.message === "Category not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export { createCategory, getCategories, removeCategory, updateCategoryController};