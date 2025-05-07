import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import { Connection, PublicKey } from "@solana/web3.js";

export class PriceOracle {
  private connection: PriceServiceConnection;
  private solanaConnection: Connection;

  constructor(
    priceServiceUrl: string = "https://hermes.pyth.network",
    solanaRpcUrl: string = process.env.SOLANA_RPC_URL ||
      "https://api.mainnet-beta.solana.com"
  ) {
    this.connection = new PriceServiceConnection(priceServiceUrl);
    this.solanaConnection = new Connection(solanaRpcUrl);
  }

  async getPrice(priceId: string): Promise<number> {
    try {
      const priceFeed = await this.connection.getLatestPrice(priceId);
      if (!priceFeed) {
        throw new Error(`Price feed not found for ${priceId}`);
      }
      return priceFeed.getPriceNoOlderThan(60); // Get price no older than 60 seconds
    } catch (error) {
      console.error(`Error fetching price for ${priceId}:`, error);
      throw error;
    }
  }

  // Add more methods for specific token price feeds
  async getUSDCPrice(): Promise<number> {
    // USDC/USD price feed ID
    const USDC_PRICE_ID = "Gv2B1yox7aJo2o7YtCNrSHGc6KtJtYqWtYdYcBx5Z3B";
    return this.getPrice(USDC_PRICE_ID);
  }

  async getUSDTPrice(): Promise<number> {
    // USDT/USD price feed ID
    const USDT_PRICE_ID = "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J";
    return this.getPrice(USDT_PRICE_ID);
  }
}
