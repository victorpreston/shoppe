import prisma from "../config/database";
import { Prisma } from "@prisma/client";
// import cloudinary from "../config/cloudinary";


/**
 * Function to add a product
 * @param name 
 * @param description 
 * @param price 
 * @param stockQuantity 
 * @param categoryId 
 * @returns 
 */
const addProduct = async (name: string, description: string, price: number, image: string, stockQuantity: number, categoryId: number) => {
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      stockQuantity,
      categoryId
    }
  });
  return newProduct;
};

// /**
//  * Function to add a product with image upload
//  * @param name 
//  * @param description 
//  * @param price 
//  * @param stockQuantity 
//  * @param categoryId 
//  * @param imagePath 
//  * @returns 
//  */
// const addProduct = async (name: string, description: string, price: number, stockQuantity: number, categoryId: string, imagePath: string) => {
//   try {
//     // Convert categoryId to integer
//     const categoryIntId = parseInt(categoryId, 10);

//     // Ensure the category exists
//     const category = await prisma.category.findUnique({ where: { id: categoryIntId } });
//     if (!category) {
//       throw new Error("Category not found");
//     }

//     console.log(`Uploading image: ${imagePath}`);

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(imagePath);
//     console.log(`Upload result: ${JSON.stringify(result)}`);

//     if (!result || !result.secure_url) {
//       throw new Error("Invalid image file");
//     }

//     // Create the product
//     const newProduct = await prisma.product.create({
//       data: {
//         name,
//         description,
//         price,
//         image: result.secure_url,
//         stockQuantity,
//         categoryId: categoryIntId
//       }
//     });

//     console.log(`Product created: ${JSON.stringify(newProduct)}`);
//     return newProduct;
//   } catch (error) {
//     console.error(error);
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("An unknown error occurred");
//     }
//   }
// };


/**
 * Function to get all products
 * @returns 
 */
const getAllProducts = async () => {
  return await prisma.product.findMany();
};

/**
 * Function to get a product by ID
 * @param id 
 * @returns 
 */
const getProductById = async (id: number) => {
  return await prisma.product.findUnique({ where: { id } });
};

/**
 * Function to update a product
 * @param id 
 * @param data 
 * @returns 
 */
const updateProduct = async (id: number, data: Prisma.ProductUpdateInput) => {
  return await prisma.product.update({
    where: { id },
    data
  });
};


/**
 * Function to delete a product
 * @param id 
 */
const deleteProduct = async (id: number) => {
  /**
   * Check if the product exists
   */
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new Error("Product not found");
  }

  /**
   * Delete the product
   */
  await prisma.product.delete({ where: { id } });
};

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };