import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const SignIn = lazy(() => import('~/features/auth/pages/sign-in'));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default AuthRoutes;
