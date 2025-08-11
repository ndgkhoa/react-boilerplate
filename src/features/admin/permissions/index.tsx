import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Permissions = lazy(() => import('~/features/admin/permissions/pages/permissions'));

const PermissionsRoutes = () => {
  return (
    <Routes>
      <Route index element={<Permissions />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default PermissionsRoutes;
