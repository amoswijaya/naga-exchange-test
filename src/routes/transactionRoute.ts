import { Router } from "express";
import {
  getTransactions,
  processTransaction,
} from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddlewate";

const router = Router();

router.get("/", authMiddleware, getTransactions);
router.post("/process", authMiddleware, processTransaction);

export default router;
