import { createTRPCRouter } from "../init";
import { authRouter } from "./auth";
// import { documentRouter } from "./document";
import { snapshotRouter } from "./snapshot";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  snapshot: snapshotRouter,
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
