import { createTRPCRouter } from '@/server/api/trpc'

import { adminRouter } from './routers/admin'
import { menuRouter } from './routers/menu'
import { openingRouter } from './routers/opening'
import { checkoutRouter } from './routers/checkout'
import { usersRouter } from './routers/users'
import { postRouter } from './routers/post'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  post: postRouter,
  admin: adminRouter,
  menu: menuRouter,
  opening: openingRouter,
  checkout: checkoutRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
