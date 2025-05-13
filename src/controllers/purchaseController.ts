import { Request, Response } from "express";
import { prisma } from "../index";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const purchase = await prisma.purchase.create({
      data: req.body,
    });
    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        token: true,
      },
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getPurchase = async (req: Request, res: Response) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { id: req.params.id },
      include: {
        token: true,
      },
    });
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.json(purchase);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updatePurchase = async (req: Request, res: Response) => {
  try {
    const purchase = await prisma.purchase.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(purchase);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deletePurchase = async (req: Request, res: Response) => {
  try {
    await prisma.purchase.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Purchase deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
