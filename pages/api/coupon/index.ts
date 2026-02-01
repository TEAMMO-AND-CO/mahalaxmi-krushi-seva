import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();

  //get 
  if (req.method === "GET") {
    const coupons = await prisma.coupon.findMany();
    return res.json(coupons);
  }

  // post
  if (req.method === "POST") {
    const {
      code,
      discount_percent,
      min_order_amount,
      valid_from,
      valid_to,
    } = req.body;

    const coupon = await prisma.coupon.create({
      data: {
        code,
        discount_percent,
        min_order_amount,
        valid_from,
        valid_to,
      },
    });

    return res.status(201).json(coupon);
  }

  res.status(405).json({ error: "Method not allowed" });
}
