import { Router, Request, Response } from "express";
import { PublicKey } from "@solana/web3.js";
import { prisma } from "../index";
import { frontEarningService } from "../index";

const router = Router();

// Get user investments
router.get(
  "/:userId",
  async (req: Request<{ userId: string }>, res: Response) => {
    try {
      const userId = req.params.userId;
      const investments = await prisma.investment.findMany({
        where: { userId },
        orderBy: { investedAt: "desc" },
      });

      res.json({
        user_id: userId,
        data: investments.map((investment) => ({
          investment_id: investment.id,
          invested_at: investment.investedAt.getTime(),
          maturity_at: investment.maturityAt.getTime(),
          expected_yield: investment.expectedYield,
        })),
      });
    } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Create new investment
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      userId,
      productId,
      amount,
      investedAt,
      maturityAt,
      expectedYield,
      txSignature,
    } = req.body;

    // Deposit liquidity on Solana
    const token = new PublicKey(req.body.token);

    const tx = await frontEarningService.depositLiquidity(amount, token);

    // Save investment to database
    const investment = await prisma.investment.create({
      data: {
        userId,
        productId,
        amount,
        investedAt: new Date(investedAt),
        maturityAt: new Date(maturityAt),
        expectedYield,
        txSignature: tx,
      },
    });

    res.status(201).json(investment);
  } catch (error) {
    console.error("Error creating investment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
