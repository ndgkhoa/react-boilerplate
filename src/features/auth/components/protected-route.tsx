import { type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '~/features/auth/hooks/use-auth-store';
import { AuthProviders } from '~/features/auth/types/AuthProviders';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const authState = useAuthStore((state) => state.auth);
  const { isAuthenticated, provider } = authState || {};

  if (isAuthenticated && provider === AuthProviders.Local) {
    return children;
  }

  return <Navigate to="/auth/sign-in" replace />;
};
