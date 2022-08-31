import { PrismaClient } from "@prisma/client";

/*
 instantiate a single instance PrismaClient and save it on the global object. Then we keep a check to only instantiate PrismaClient if it's not on the global object otherwise use the same instance again if already present to prevent instantiating extra PrismaClient instances.
*/

declare global {
  // allow global 'var' declarations
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
