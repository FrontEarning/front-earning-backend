import { Request, Response } from "express";
import { prisma } from "../index";

export const createToken = async (req: Request, res: Response) => {
  try {
    const token = await prisma.token.create({
      data: req.body,
    });
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getTokens = async (req: Request, res: Response) => {
  try {
    const tokens = await prisma.token.findMany({
      include: {
        purchases: true,
      },
    });
    res.json(tokens);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getToken = async (req: Request, res: Response) => {
  try {
    const token = await prisma.token.findUnique({
      where: { id: req.params.id },
      include: {
        purchases: true,
      },
    });
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    res.json(token);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateToken = async (req: Request, res: Response) => {
  try {
    const token = await prisma.token.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(token);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Token not found" });
    }
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteToken = async (req: Request, res: Response) => {
  try {
    await prisma.token.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Token deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Token not found" });
    }
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
