import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const snapshotRouter = createTRPCRouter({
  getSnapshots: baseProcedure.query(async ({ ctx }) => {
    return ctx.prisma.snapshot.findMany();
  }),
  saveSnapshot: baseProcedure
    .input(
      z.object({
        data: z.any(),
        userId: z.string(),
        snapshotId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.snapshot.upsert({
        where: {
          id: input.snapshotId || "",
        },
        update: {
          data: input.data,
          userId: input.userId,
        },
        create: {
          data: input.data,
          userId: input.userId,
        },
      });
    }),
});
