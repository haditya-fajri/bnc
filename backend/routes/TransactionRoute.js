import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  overviewTransaction,
  updateTransaction,
} from "../controllers/Transactions.js";

import { VerifyUser, CheckerOnly, MakerOnly } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/transactions/overview", VerifyUser, overviewTransaction);
router.get("/transactions/", VerifyUser, getTransactions);
router.get("/transactions/:id", VerifyUser, getTransactionById);
router.post("/transactions", VerifyUser, MakerOnly, createTransaction);
router.patch("/transactions/:id", VerifyUser, CheckerOnly, updateTransaction);

export default router;
