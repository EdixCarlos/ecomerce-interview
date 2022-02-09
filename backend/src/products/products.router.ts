import { BaseProduct, Product } from "./product.interface";
/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as productService from "./products.service";
/**
 * Router Definition
 */
export const productsRouter = express.Router();
/**
 * Controller Definitions
 */

// GET products
productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    await productService.findAll();
    const products: Product[] = await productService.findAll();

    res.status(200).send(products);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// GET products/:id
productsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const product: Product = await productService.find(id);

    if (product[0]) {
      return res.status(200).send(product);
    }

    res.status(404).send("product not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// GET products/bycategory/:category
productsRouter.get("/bycategory/:category", async (req: Request, res: Response) => {
  const category: number = parseInt(req.params.category, 10);
  try {
    const product: Product = await productService.findByCategory(category);

    if (product[0]) {
      return res.status(200).send(product);
    }

    res.status(404).send("product not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// GET products/byMatch/:str
productsRouter.get("/byMatch/:str", async (req: Request, res: Response) => {
  const str: string = (req.params.str).toString();
  try {
    const product: Product = await productService.findByMatch(str);

    if (product[0]) {
      return res.status(200).send(product);
    }

    res.status(404).send("product not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// POST products
productsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const product: BaseProduct = req.body;

    const newProduct = await productService.create(product);

    res.status(201).json(newProduct);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// PUT products/:id
productsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const productUpdate: Product = req.body;

    const existingProduct: Product = await productService.find(id);

    if (existingProduct) {
      const updatedProduct = await productService.update(id, productUpdate);
      return res.status(200).json(updatedProduct);
    }

    const newProduct = await productService.create(productUpdate);

    res.status(201).json(newProduct);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// DELETE products/:id
productsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await productService.remove(id);

    res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
