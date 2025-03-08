// app/pages/api/trpc/[trpc].ts
import { appRouter } from "@/app/trpc/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/app/trpc/init";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

// Exporta los manejadores de métodos HTTP como exportaciones nombradas
export { handler as GET, handler as POST };
