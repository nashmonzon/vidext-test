import { createTRPCRouter } from "../init";
// import { documentRouter } from "./document";
import { snapshotRouter } from "./snapshot";

export const appRouter = createTRPCRouter({
  // document: documentRouter,
  snapshot: snapshotRouter,
});

export type AppRouter = typeof appRouter;
