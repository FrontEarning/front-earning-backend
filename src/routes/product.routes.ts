import { Router, Request, Response } from "express";
import { prisma } from "../index";

const router = Router();

// Get product by ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all active products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new product
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      symbol,
      title,
      description,
      price,
      discountRate,
      interestRate,
      minAmount,
      maxAmount,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        symbol,
        title,
        description,
        price,
        discountRate,
        interestRate,
        minAmount,
        maxAmount,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update product
router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      discountRate,
      interestRate,
      minAmount,
      maxAmount,
      isActive,
    } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        discountRate,
        interestRate,
        minAmount,
        maxAmount,
        isActive,
      },
    });

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
