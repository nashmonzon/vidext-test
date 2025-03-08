// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // Cambia esto si usas otro proveedor
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // Cambia a true si deseas que los usuarios se inicien sesión automáticamente después de registrarse
  },
});
