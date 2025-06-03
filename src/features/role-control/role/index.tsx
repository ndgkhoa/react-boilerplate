import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Role = lazy(() => import('~/features/role-control/role/pages/role'));

const RoleRoutes = () => {
  return (
    <Routes>
      <Route index element={<Role />} />
      {/* <Route path=":id" element={<RolePermissions />} /> */}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default RoleRoutes;
