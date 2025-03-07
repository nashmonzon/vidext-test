import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const documentRouter = createTRPCRouter({
  // Procedimiento para obtener todos los documentos
  getDocuments: baseProcedure.query(async ({ ctx }) => {
    return ctx.prisma.document.findMany({
      include: { shapes: true },
    });
  }),

  // Procedimiento para crear un nuevo documento
  createDocument: baseProcedure
    .input(
      z.object({
        title: z.string(),
        shapes: z
          .array(
            z.object({
              type: z.string(),
              properties: z.any(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.document.create({
        data: {
          title: input.title,
          shapes: {
            create: input.shapes?.map((shape) => ({
              type: shape.type,
              properties: shape.properties,
            })),
          },
        },
      });
    }),
});
