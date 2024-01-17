import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { prisma } from '@/server/db'

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts
  return {
    req,
    res,
    prisma
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

// import { createNextApiHandler } from "@trpc/server/adapters/next";

// import { env } from "../../../env/server.mjs";
// import { createContext } from "../../../server/trpc/context";
// import { appRouter } from "../../../server/trpc/router/_app";

// // export API handler
// export default createNextApiHandler({
//   router: appRouter,
//   createContext,
//   onError:
//     env.NODE_ENV === "development"
//       ? ({ path, error }) => {
//           console.error(`❌ tRPC failed on ${path}: ${error}`);
//         }
//       : undefined,
// });
