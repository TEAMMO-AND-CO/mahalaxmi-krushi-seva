import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();


  //get
  if (req.method === "GET") {
    const { order_id } = req.query;

    const items = await prisma.order_item.findMany({
      where: { order_id: Number(order_id) },
      include: {
        product: true,
      },
    });

    return res.json(items);
  }

 //add
  if (req.method === "POST") {
    const { order_id, product_id, qty, unit_price } = req.body;

    const item = await prisma.order_item.create({
      data: {
        order_id,
        product_id,
        qty,
        unit_price,
      },
    });

    return res.status(201).json(item);
  }

  res.status(405).json({ error: "Method not allowed" });
}
