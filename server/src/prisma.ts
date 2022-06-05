import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    //Creating a log of all operations
    log: ['query'],
});