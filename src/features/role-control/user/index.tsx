import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const User = lazy(() => import('~/features/role-control/user/pages/user'));

const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<User />} />
      {/* <Route path=":id" element={<UserRoles />} /> */}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default UserRoutes;
