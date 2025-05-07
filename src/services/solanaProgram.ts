// import {
//   Connection,
//   PublicKey,
//   Transaction,
//   SystemProgram,
// } from "@solana/web3.js";
// import { PriceOracle } from "./priceOracle";

// export class SolanaProgramService {
//   private connection: Connection;
//   private priceOracle: PriceOracle;

//   constructor(
//     solanaRpcUrl: string = process.env.SOLANA_RPC_URL ||
//       "https://api.mainnet-beta.solana.com"
//   ) {
//     this.connection = new Connection(solanaRpcUrl);
//     this.priceOracle = new PriceOracle();
//   }

//   async createPaymentTransaction(
//     from: PublicKey,
//     to: PublicKey,
//     amount: number,
//     token: string
//   ): Promise<Transaction> {
//     // TODO: Implement actual payment transaction creation
//     // This is a placeholder that needs to be replaced with actual program interaction
//     const transaction = new Transaction();

//     // Add payment instruction
//     // transaction.add(createPaymentInstruction(...));

//     return transaction;
//   }

//   async createInvestmentTransaction(
//     user: PublicKey,
//     amount: number,
//     token: string,
//     maturityDate: Date
//   ): Promise<Transaction> {
//     // TODO: Implement actual investment transaction creation
//     // This is a placeholder that needs to be replaced with actual program interaction
//     const transaction = new Transaction();

//     // Add investment instruction
//     // transaction.add(createInvestmentInstruction(...));

//     return transaction;
//   }

//   async createSettlementTransaction(
//     investmentId: string,
//     user: PublicKey
//   ): Promise<Transaction> {
//     // TODO: Implement actual settlement transaction creation
//     // This is a placeholder that needs to be replaced with actual program interaction
//     const transaction = new Transaction();

//     // Add settlement instruction
//     // transaction.add(createSettlementInstruction(...));

//     return transaction;
//   }

//   async sendTransaction(transaction: Transaction): Promise<string> {
//     try {
//       const signature = await this.connection.sendTransaction(transaction);
//       await this.connection.confirmTransaction(signature);
//       return signature;
//     } catch (error) {
//       console.error("Error sending transaction:", error);
//       throw error;
//     }
//   }
// }
