import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Permission = lazy(() => import('~/features/role-control/permission/pages/permission'));

const PermissionRoutes = () => {
  return (
    <Routes>
      <Route index element={<Permission />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default PermissionRoutes;
