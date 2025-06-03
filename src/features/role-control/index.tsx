import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const PermissionRoutes = lazy(() => import('~/features/role-control/permission'));
const RoleRoutes = lazy(() => import('~/features/role-control/role'));
const UserRoutes = lazy(() => import('~/features/role-control/user'));

const RoleControlRoutes = () => {
  return (
    <Routes>
      <Route path="permission/*" element={<PermissionRoutes />} />
      <Route path="role/*" element={<RoleRoutes />} />
      <Route path="user/*" element={<UserRoutes />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default RoleControlRoutes;
