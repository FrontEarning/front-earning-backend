import { Router, Request, Response } from "express";
import { PublicKey } from "@solana/web3.js";
import { prisma } from "../index";
import { frontEarningService } from "../index";

const router = Router();

// Get user payments
router.get(
  "/:userId",
  async (req: Request<{ userId: string }>, res: Response) => {
    try {
      const userId = req.params.userId;
      const payments = await prisma.payment.findMany({
        where: { userId },
        orderBy: { paidAt: "desc" },
      });

      res.json({
        user_id: userId,
        data: payments.map((payment) => ({
          payment_id: payment.id,
          paid_place: payment.paidPlace,
          amount: payment.amount,
          actual_amount: payment.actualAmount,
          paid_time: payment.paidAt.getTime(),
          discount_rate: payment.discountRate,
        })),
      });
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Create new payment
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      userId,
      productId,
      amount,
      actualAmount,
      discountRate,
      txSignature,
      paidAt,
    } = req.body;

    // Execute payment on Solana
    const paymentId = new PublicKey(req.body.paymentId);
    const token = new PublicKey(req.body.token);

    const tx = await frontEarningService.executePayment(
      paymentId,
      amount,
      token
    );

    // Save payment to database
    const payment = await prisma.payment.create({
      data: {
        userId,
        productId,
        amount,
        actualAmount,
        discountRate,
        txSignature: tx,
        paidAt: new Date(paidAt),
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
