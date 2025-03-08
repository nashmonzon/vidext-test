import { createTRPCRouter } from "../init";
import { authRouter } from "./auth";
// import { documentRouter } from "./document";
import { snapshotRouter } from "./snapshot";

export const appRouter = createTRPCRouter({
  // document: documentRouter,
  snapshot: snapshotRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
