import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Users = lazy(() => import('~/features/admin/users/pages/users'));

const UsersRoutes = () => {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default UsersRoutes;
