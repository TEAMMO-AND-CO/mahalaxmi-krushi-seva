import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';


export default function getPrismaClient() {
    const connectionString = process.env.DIRECT_URL;
    if (connectionString == undefined || connectionString.length === 0) {
        throw new Error("DATABASE_URL is not defined in environment variables");
    }
    const prismaPg = new PrismaPg({ connectionString });
    const prisma = new PrismaClient({ adapter: prismaPg });
    return prisma;
}
