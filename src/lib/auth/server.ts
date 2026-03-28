import { createAuthServer, authApiHandler, neonAuthMiddleware } from '@neondatabase/auth/next/server';

export const authServer = createAuthServer();
export const authHandler = authApiHandler;
export const authMiddleware = neonAuthMiddleware;
