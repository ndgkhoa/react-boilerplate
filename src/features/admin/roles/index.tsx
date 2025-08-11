import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Roles = lazy(() => import('~/features/admin/roles/pages/roles'));

const RolesRoutes = () => {
  return (
    <Routes>
      <Route index element={<Roles />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default RolesRoutes;
