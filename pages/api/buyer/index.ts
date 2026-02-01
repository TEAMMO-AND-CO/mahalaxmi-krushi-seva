import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();

  // Get 
  if (req.method === "GET") {
    const buyers = await prisma.buyers.findMany();
    return res.json(buyers);
  }

  //  Create
  if (req.method === "POST") {
    const { name, contact_phone, address } = req.body;

    const buyer = await prisma.buyers.create({
      data: { name, contact_phone, address },
    });

    return res.status(201).json(buyer);
  }

  res.status(405).json({ error: "Method not allowed" });
}
