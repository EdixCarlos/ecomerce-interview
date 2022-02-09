
// src/products/category.service.ts

/**
 * Data Model Interfaces
 */
 import { Categorys } from './categorys.interface';
 import { execute } from "../mysql.connector";
 import { ProductQueries } from "../querys/Product.query";
 /**
  * query Store
  */
 
 
 
 /**
  * Service Methods
  */
  export const findAllByCategory = async (): Promise<Categorys[]> => {
      const result =await execute<Categorys>(ProductQueries.GetProducts, [])
     return Object.values(result)
 };
 