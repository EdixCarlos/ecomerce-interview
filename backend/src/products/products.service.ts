import { Category } from "./../category/category.interface";
import { findAllByCategory } from "./../category/category.service";

// src/products/products.service.ts

/**
 * Data Model Interfaces
 */
import { BaseProduct, Product } from "./product.interface";
import { Products } from "./products.interface";
import { execute } from "../mysql.connector";
import { ProductQueries } from "../querys/Product.query";
/**
 * query Store
 */

let products: Products;
let product: Product;
/**
 * Service Methods
 */
export const findAll = async (): Promise<Product[]> => {
  const result = await execute<Products>(ProductQueries.GetProducts, []);
  return Object.values(result);
};

export const find = async (id: number): Promise<Product> => {
  const result = await execute<Product>(ProductQueries.GetProductById, [id]);
  return result;
};
export const findByCategory = async (category: number): Promise<Product> => {
  const result = await execute<Product>(ProductQueries.GetProductsByCategory, [
    category,
  ]);
  return result;
};
export const findByMatch = async (str: string): Promise<Product> => {
  console.log(str)
  const result = await execute<Product>(ProductQueries.GetProductsByMatch, [
    str,
  ]);
  
  return result;
};

export const create = async (newProduct: BaseProduct): Promise<BaseProduct> => {
  const result = await execute<BaseProduct>(ProductQueries.AddProduct, [
    newProduct.name,
    newProduct.url_image,
    newProduct.price,
    newProduct.discount,
    newProduct.category,
  ]);
  console.log(result);

  return result;
};

export const update = async (
  id: number,
  productUpdate: BaseProduct
): Promise<Product | null> => {
  const product = await find(id);

  if (!product) {
    return null;
  }

  products[id] = { id, ...productUpdate };

  return products[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const product = await find(id);

  if (!product) {
    return null;
  }

  delete products[id];
};
