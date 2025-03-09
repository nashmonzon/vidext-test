import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const userRouter = createTRPCRouter({
  getUser: baseProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log(input.userId, "sdjadsjahdsjahdskajhdskaj");
      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        include: {
          snapshots: true,
        },
      });
    }),
  getUserSnapshots: baseProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.snapshot.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
});
