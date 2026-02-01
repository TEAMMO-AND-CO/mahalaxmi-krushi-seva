import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  // get
  if (req.method === "GET") {
    const categories = await prisma.category.findMany();
    return res.json(categories);
  }

  // post
  if (req.method === "POST") {
    const { name, slug } = req.body;

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return res.status(201).json(category);
  }

  res.status(405).json({ error: "Method not allowed" });
}
