import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  //get
  if (req.method === "GET") {
    const { cart_id } = req.query;

    const items = await prisma.cart_item.findMany({
      where: { cart_id: Number(cart_id) },
      include: {
        product: true,
      },
    });

    return res.json(items);
  }

  // post
  if (req.method === "POST") {
    const { cart_id, product_id, qty } = req.body;

    // check if item already exists
    const existing = await prisma.cart_item.findFirst({
      where: {
        cart_id,
        product_id,
      },
    });

    if (existing) {
      // update 
      const updated = await prisma.cart_item.update({
        where: { cart_item_id: existing.cart_item_id },
        data: {
          qty: existing.qty + qty,
        },
      });

      return res.json(updated);
    }

    // create 
    const item = await prisma.cart_item.create({
      data: {
        cart_id,
        product_id,
        qty,
      },
    });

    return res.status(201).json(item);
  }

  res.status(405).json({ error: "Method not allowed" });
}
