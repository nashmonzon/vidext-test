import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { revalidatePath } from "next/cache";

export const snapshotRouter = createTRPCRouter({
  getSnapshots: baseProcedure.query(async ({ ctx }) => {
    return ctx.prisma.snapshot.findMany();
  }),
  createSnapshot: baseProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newSnapshot = await ctx.prisma.snapshot.create({
        data: {
          data: {},
          userId: input.userId,
        },
      });

      return newSnapshot.id;
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

      await revalidatePath(`/f/${input.userId}`);
    }),
});
