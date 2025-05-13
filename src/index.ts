import express from "express";
import { PrismaClient } from "@prisma/client";
import { Connection } from "@solana/web3.js";
import dotenv from "dotenv";
import routes from "./routes";

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Initialize Solana connection
export const solanaConnection = new Connection(
  process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
