import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const PermissionsRoutes = lazy(() => import('~/features/admin/permissions'));
const RolesRoutes = lazy(() => import('~/features/admin/roles'));
const UsersRoutes = lazy(() => import('~/features/admin/users'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="permissions/*" element={<PermissionsRoutes />} />
      <Route path="roles/*" element={<RolesRoutes />} />
      <Route path="users/*" element={<UsersRoutes />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default AdminRoutes;
