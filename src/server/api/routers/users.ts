import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import bcrypt from 'bcrypt'

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().nonempty(), email: z.string().email(), password: z.string().min(4) }))
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 4)
      await ctx.prisma.user.create({
        data: {
          ...input,
          password: hashedPassword
        }
      })
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany()
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  })
})
