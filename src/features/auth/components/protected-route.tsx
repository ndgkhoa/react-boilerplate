import { type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '~/stores/auth';
import { AuthProviders } from '~/features/auth/types/AuthProviders';

interface Props extends PropsWithChildren {
  allowed?: string;
}

export const ProtectedRoute = ({ children, allowed }: Props) => {
  const authState = useAuthStore((state) => state.auth);
  const { isAuthenticated, provider } = authState || {};

  if (isAuthenticated && provider === AuthProviders.Local) {
    return children;
  }

  return <Navigate to="/auth/sign-in" replace />;
};
