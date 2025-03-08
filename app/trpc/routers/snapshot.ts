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
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.snapshot.create({
        data: {
          data: input.data,
        },
      });
    }),
});
