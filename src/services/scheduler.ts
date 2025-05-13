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
    cron.schedule("* * * * *", async () => {
      try {
        const now = new Date();
        const maturedInvestments = await prisma.deposit.findMany({
          where: {
            updatedAt: {
              lte: now,
            },
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
      await prisma.deposit.update({
        where: { id: investment.id },
        data: { status: "SETTLED" },
      });
    } catch (error) {
      console.error(`Error processing investment ${investment.id}:`, error);
    }
  }
}
