import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();

  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  const { order_id, coupon_id } = req.body;

  const link = await prisma.order_coupon.create({
    data: {
      order_id,
      coupon_id,
    },
  });

  res.status(201).json({
    message: "Coupon attached to order",
    link,
  });
}
