import cron from "node-cron";
import { prisma } from "../index";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

export class InvestmentScheduler {
  private connection: Connection;

  constructor(
    solanaRpcUrl: string = process.env.SOLANA_RPC_URL ||
      "https://api.mainnet-beta.solana.com"
  ) {
    this.connection = new Connection(solanaRpcUrl);
    this.initializeScheduler();
  }

  private initializeScheduler() {
    // Run every minute to check for matured investments
    cron.schedule("* * * * *", async () => {
      try {
        const now = new Date();
        const maturedInvestments = await prisma.investment.findMany({
          where: {
            maturityAt: {
              lte: now,
            },
            // Add a status field to track if settlement has been processed
            status: "ACTIVE",
          },
        });

        for (const investment of maturedInvestments) {
          await this.processMaturedInvestment(investment);
        }
      } catch (error) {
        console.error("Error processing matured investments:", error);
      }
    });
  }

  private async processMaturedInvestment(investment: any) {
    try {
      // TODO: Implement settlement logic with Solana program
      // 1. Create settlement transaction
      // 2. Send transaction to Solana network
      // 3. Update investment status in database

      // For now, just mark as processed
      await prisma.investment.update({
        where: { id: investment.id },
        data: { status: "SETTLED" },
      });
    } catch (error) {
      console.error(`Error processing investment ${investment.id}:`, error);
    }
  }
}
