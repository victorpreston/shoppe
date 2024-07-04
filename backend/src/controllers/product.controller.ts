import { Request, Response } from "express";
import { 
  addProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from "../services/product.service";


/**
 * Controller to create a product with image upload
 * @param req 
 * @param res 
 * @returns 
 */
const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, image, stockQuantity, categoryId } = req.body;
  try {
    const product = await addProduct(name, description, price, image, stockQuantity, categoryId);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};



/**
 * getProducts
 * @param req 
 * @param res 
 */
const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * getProduct
 * @param req 
 * @param res 
 */
const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await getProductById(Number(id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * updateExistingProduct
 * @param req 
 * @param res 
 */
const updateExistingProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const product = await updateProduct(Number(id), data);
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * deleteExistingProduct
 * @param req 
 * @param res 
 */
const deleteExistingProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteProduct(Number(id));
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { createProduct, getProducts, getProduct, updateExistingProduct, deleteExistingProduct };