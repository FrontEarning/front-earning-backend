import { Request, Response } from "express";
import { prisma } from "../index";

export const createVault = async (req: Request, res: Response) => {
  try {
    const vault = await prisma.vault.create({
      data: req.body,
    });
    res.status(201).json(vault);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getVaults = async (req: Request, res: Response) => {
  try {
    const vaults = await prisma.vault.findMany({
      include: {
        deposits: true,
      },
    });
    res.json(vaults);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getVault = async (req: Request, res: Response) => {
  try {
    const vault = await prisma.vault.findUnique({
      where: { id: req.params.id },
      include: {
        deposits: true,
      },
    });
    if (!vault) {
      return res.status(404).json({ message: "Vault not found" });
    }
    res.json(vault);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateVault = async (req: Request, res: Response) => {
  try {
    const vault = await prisma.vault.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(vault);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Vault not found" });
    }
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteVault = async (req: Request, res: Response) => {
  try {
    await prisma.vault.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Vault deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Vault not found" });
    }
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
