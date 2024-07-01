import prisma from "../config/database";


/**
 * addCategory
 * @param name 
 * @returns 
 */
const addCategory = async (name: string) => {
  const category = await prisma.category.create({
    data: { name }
  });
  return category;
};

/**
 * getAllCategories
 * @returns 
 */
const getAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

/**
 * updateCategory
 * @param id 
 * @param name 
 * @returns 
 */
const updateCategory = async (id: number, name: string) => {
  const category = await prisma.category.update({
    where: { id },
    data: { name },
  });
  return category;
};


/**
 * deleteCategory
 * @param id 
 * @returns 
 */
const deleteCategory = async (id: number) => {
  try {
    const category = await prisma.category.delete({
      where: { id }
    });
    return category;
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error("Category not found");
    }
    throw error;
  }
};

export { addCategory, getAllCategories, deleteCategory, updateCategory };