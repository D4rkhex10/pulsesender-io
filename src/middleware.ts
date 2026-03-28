import { authMiddleware } from '@/lib/auth/server';

export default authMiddleware({
  loginUrl: '/auth/sign-in',
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
