import { Request, Response } from "express";
import { prisma } from "../index";

export const createDeposit = async (req: Request, res: Response) => {
  try {
    const deposit = await prisma.deposit.create({
      data: req.body,
    });
    res.status(201).json(deposit);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getDeposits = async (req: Request, res: Response) => {
  try {
    const deposits = await prisma.deposit.findMany({
      include: {
        vault: true,
      },
    });
    res.json(deposits);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getDeposit = async (req: Request, res: Response) => {
  try {
    const deposit = await prisma.deposit.findUnique({
      where: { id: req.params.id },
      include: {
        vault: true,
      },
    });
    if (!deposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }
    res.json(deposit);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateDeposit = async (req: Request, res: Response) => {
  try {
    const deposit = await prisma.deposit.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(deposit);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Deposit not found" });
    }
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteDeposit = async (req: Request, res: Response) => {
  try {
    await prisma.deposit.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Deposit deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Deposit not found" });
    }
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
