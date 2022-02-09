// src/category/category.interface.ts
export interface BaseCategory {
    name: string;
  }
  
  export interface Category extends BaseCategory {
    id: number;
  }
  