import express from "express";
import * as vaultController from "../controllers/vaultController";
import * as tokenController from "../controllers/tokenController";
import * as depositController from "../controllers/depositController";
import * as purchaseController from "../controllers/purchaseController";

const router = express.Router();

// Vault routes
router.post("/vaults", vaultController.createVault);
router.get("/vaults", vaultController.getVaults);
router.get("/vaults/:id", vaultController.getVault);
router.put("/vaults/:id", vaultController.updateVault);
router.delete("/vaults/:id", vaultController.deleteVault);

// Token routes
router.post("/tokens", tokenController.createToken);
router.get("/tokens", tokenController.getTokens);
router.get("/tokens/:id", tokenController.getToken);
router.put("/tokens/:id", tokenController.updateToken);
router.delete("/tokens/:id", tokenController.deleteToken);

// Deposit routes
router.post("/deposits", depositController.createDeposit);
router.get("/deposits", depositController.getDeposits);
router.get("/deposits/:id", depositController.getDeposit);
router.put("/deposits/:id", depositController.updateDeposit);
router.delete("/deposits/:id", depositController.deleteDeposit);

// Purchase routes
router.post("/purchases", purchaseController.createPurchase);
router.get("/purchases", purchaseController.getPurchases);
router.get("/purchases/:id", purchaseController.getPurchase);
router.put("/purchases/:id", purchaseController.updatePurchase);
router.delete("/purchases/:id", purchaseController.deletePurchase);

export default router;
