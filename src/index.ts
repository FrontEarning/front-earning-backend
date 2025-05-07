import express from "express";
import { PrismaClient } from "@prisma/client";
import { Connection } from "@solana/web3.js";
import dotenv from "dotenv";
import { FrontEarningProgramService } from "./services/frontEarningProgram";
import productRoutes from "./routes/product.routes";
import paymentRoutes from "./routes/payment.routes";
import investmentRoutes from "./routes/investment.routes";

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Initialize Solana connection
export const solanaConnection = new Connection(
  process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
);

// Initialize FrontEarning program service
export const frontEarningService = new FrontEarningProgramService(
  // TODO: Initialize with proper wallet
  {} as any,
  process.env.SOLANA_RPC_URL
);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/payment", paymentRoutes);
app.use("/investment", investmentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
