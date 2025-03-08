// app/trpc/routers/auth.ts
import { auth } from "@/app/lib/auth";
import { createTRPCRouter, baseProcedure } from "../init";
import { z } from "zod";

import { authClient } from "@/app/lib/auth-client";

// Asegúrate de definir esto en tu .env

export const authRouter = createTRPCRouter({
  signIn: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Usa Better Auth para manejar la autenticación
      const user = await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
        },
        asResponse: false, // Cambia a true si necesitas un objeto de respuesta
      });

      // // // Genera un token JWT
      // const token = jwt.sign({ userId: user.user.id }, JWT_SECRET, {
      //   expiresIn: "1h",
      // });

      // // Establece el token en una cookie
      // ctx.res.setHeader("Set-Cookie", `auth-token=${token}; Path=/; HttpOnly`);

      return user;
    }),
  signUp: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Usa Better Auth para registrar un nuevo usuario
      const user = await auth.api.signUpEmail({
        body: {
          email: input.email,
          password: input.password,
          name: input.name,
        },
        asResponse: false, // Cambia a true si necesitas un objeto de respuesta
      });
      return user;
    }),
  signOut: baseProcedure.mutation(async () => {
    await authClient.signOut();
    // console.log("signOut", ctx);
    // ctx.res.setHeader("Set-Cookie", "auth-token=; Path=/; HttpOnly; Max-Age=0");
  }),
});
