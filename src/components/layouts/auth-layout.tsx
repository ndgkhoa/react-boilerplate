import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '~/features/auth/hooks/use-auth-store';
import { FullscreenFallback } from '~/components/fallbacks';

export const AuthLayout = () => {
  const authState = useAuthStore((state) => state.auth);
  const isAuthenticated = authState?.isAuthenticated;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<FullscreenFallback />}>
      <Outlet />
    </Suspense>
  );
};
