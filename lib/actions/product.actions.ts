"use server";

import {
  CreateProductParams,
  DeleteProductParams,
  GetAllProductsParams,
  GetProductsByUserParams,
  GetRelatedProductsByCategoryParams,
  UpdateProductParams,
} from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Product from "../database/models/product.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateProduct = async (query: any) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "category",
      model: Category,
      select: "_id name",
    });
};

// CREATE
export const createProduct = async ({
  product,
  userId,
  path,
}: CreateProductParams) => {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);

    if (!creator) {
      throw new Error("Creator not found");
    }

    const newProduct = await Product.create({
      ...product,
      category: product.categoryId,
      creator: userId,
    });

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    handleError(error);
  }
};

// GET ONE PRODUCT BY ID
export const getProductById = async (productId: string) => {
  try {
    await connectToDatabase();

    const product = await populateProduct(Product.findById(productId));

    if (!product) {
      throw new Error("Product not found");
    }

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllProductsParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    const excludedProductCondition = "65e9d07d684eaf43ce92ee67"
      ? { _id: { $ne: "65e9d07d684eaf43ce92ee67" } }
      : {};

    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
        excludedProductCondition,
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const productQuery = Product.find(conditions)
      .sort({
        createdAt: "desc",
      })
      .skip(skipAmount)
      .limit(limit);

    const products = await populateProduct(productQuery);
    const productsCount = await Product.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(productsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// DELETE
export async function deleteProduct({ productId, path }: DeleteProductParams) {
  try {
    await connectToDatabase();

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateProduct({
  userId,
  product,
  path,
}: UpdateProductParams) {
  try {
    await connectToDatabase();

    const productToUpdate = await Product.findById(product._id);
    if (!productToUpdate || productToUpdate.creator.toHexString() !== userId) {
      throw new Error("Unauthorized or product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { ...product, category: product.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED PRODUCTS: PRODUCTS WITH SAME CATEGORY
export async function getRelatedProductsByCategory({
  categoryId,
  productId,
  limit = 3,
  page = 1,
}: GetRelatedProductsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: productId } }],
    };

    const productsQuery = Product.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const products = await populateProduct(productsQuery);
    const productsCount = await Product.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(productsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET PRODUCTS BY ORGANIZER
export async function getProductsByUser({
  userId,
  limit = 6,
  page,
}: GetProductsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const productsQuery = Product.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const products = await populateProduct(productsQuery);
    const productsCount = await Product.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(productsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
