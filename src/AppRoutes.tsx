import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import { MainLayout, AuthLayout } from '~/components/layouts';
import { NotFound } from '~/components/errors';
import { ProtectedRoute } from '~/features/auth/components/protected-route';
import Dashboard from '~/features/dashboard';
const AuthRoutes = lazy(() => import('~/features/auth'));
const AdminRoutes = lazy(() => import('~/features/admin'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
