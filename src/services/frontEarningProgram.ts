import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
} from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { IDL, FrontEarningProgram } from "../idl/front_earning_program";

export class FrontEarningProgramService {
  private connection: Connection;
  private program: Program<FrontEarningProgram>;
  private provider: AnchorProvider;

  constructor(
    wallet: any, // TODO: Replace with proper wallet type
    solanaRpcUrl: string = process.env.SOLANA_RPC_URL ||
      "https://api.mainnet-beta.solana.com"
  ) {
    this.connection = new Connection(solanaRpcUrl);
    this.provider = new AnchorProvider(this.connection, wallet, {
      commitment: "confirmed",
    });

    // Program ID should be replaced with actual deployed program ID
    const programId = new PublicKey(process.env.PROGRAM_ID || "");
    this.program = new Program<FrontEarningProgram>(
      IDL,
      programId,
      this.provider
    );
  }

  async initializeConfig(
    discountBps: number,
    settleWaitSecs: number
  ): Promise<string> {
    try {
      const tx = await this.program.methods
        .initConfig(discountBps, settleWaitSecs)
        .accounts({
          authority: this.provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error("Error initializing config:", error);
      throw error;
    }
  }

  async depositLiquidity(amount: number, token: PublicKey): Promise<string> {
    try {
      const tx = await this.program.methods
        .depositLiquidity(amount)
        .accounts({
          user: this.provider.wallet.publicKey,
          token,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error("Error depositing liquidity:", error);
      throw error;
    }
  }

  async executePayment(
    paymentId: PublicKey,
    amount: number,
    token: PublicKey
  ): Promise<string> {
    try {
      const tx = await this.program.methods
        .executePayment(amount)
        .accounts({
          buyer: this.provider.wallet.publicKey,
          payment: paymentId,
          token,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error("Error executing payment:", error);
      throw error;
    }
  }

  async settle(paymentId: PublicKey): Promise<string> {
    try {
      const tx = await this.program.methods
        .settle()
        .accounts({
          seller: this.provider.wallet.publicKey,
          payment: paymentId,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error("Error settling payment:", error);
      throw error;
    }
  }

  async getPaymentAccount(paymentId: PublicKey) {
    try {
      const account = await this.program.account.Payment.fetch(paymentId);
      return account;
    } catch (error) {
      console.error("Error fetching payment account:", error);
      throw error;
    }
  }
}
