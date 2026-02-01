import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();

  // Get 
  if (req.method === "GET") {
    const sellers = await prisma.seller.findMany();
    return res.json(sellers);
  }

  //  Create 
  if (req.method === "POST") {
    const { name, contact_phone, contact_email, address } = req.body;

    const seller = await prisma.seller.create({
      data: { name, contact_phone, contact_email, address },
    });

    return res.status(201).json(seller);
  }

  res.status(405).json({ error: "Method not allowed" });
}
