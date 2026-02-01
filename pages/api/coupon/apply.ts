import type { NextApiRequest, NextApiResponse } from "next";
import getPrismaClient from "@/prisma/lib/getPrismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const prisma = getPrismaClient();
  const { code, order_amount } = req.body;

  const coupon = await prisma.coupon.findUnique({
    where: { code },
  });

  if (!coupon) {
    return res.status(404).json({ error: "Coupon not found" });
  }

  if (
    coupon.min_order_amount !== null &&
    order_amount < Number(coupon.min_order_amount)
  ) {
    return res
      .status(400)
      .json({ error: "Minimum amount not reached" });
  }

  const discount =
    (order_amount * Number(coupon.discount_percent)) / 100;

  return res.json({
    discount,
    final_amount: order_amount - discount,
    coupon,
  });
}
