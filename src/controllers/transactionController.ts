import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddlewate";
import prisma from "../lib/prisma";

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const list = await prisma.transaction.findMany({
      where: { user_id: req.user!.id },
      orderBy: { created_at: "desc" },
    });
    return res.json({ success: true, message: "OK", data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const processTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { id, amount } = req.body;
    if (!amount || isNaN(Number(amount))) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a numeric string" });
    }

    const userId = req.user!.id;

    if (id) {
      const tx = await prisma.transaction.findFirst({
        where: { id, user_id: userId },
      });
      if (!tx)
        return res
          .status(404)
          .json({ success: false, message: "Transaction not found" });

      const updated = await prisma.transaction.update({
        where: { id },
        data: { amount },
      });
      return res.json({
        success: true,
        message: "Transaction updated",
        data: updated,
      });
    }

    const created = await prisma.transaction.create({
      data: { user_id: userId, amount },
    });
    return res.json({
      success: true,
      message: "Transaction created",
      data: created,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
