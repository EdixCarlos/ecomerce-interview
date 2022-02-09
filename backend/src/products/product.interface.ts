// src/products/product.interface.ts
export interface BaseProduct {
  name: string;
  url_image: string;
  price: number;
  discount: number;
  category: number;
}

export interface Product extends BaseProduct {
  id: number;
}
