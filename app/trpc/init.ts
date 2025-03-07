// trpc/init.ts
import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define el tipo de contexto
type Context = {
  prisma: PrismaClient;
};

// Define el contexto de tRPC
export const createTRPCContext = cache(async (): Promise<Context> => {
  // Aquí puedes incluir lógica para obtener el contexto, como el ID de usuario
  return { prisma };
});

// Inicializa tRPC
const t = initTRPC.context<Context>().create();

// Define el router base y los procedimientos
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
