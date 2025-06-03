import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="text-2xl text-red-500">
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      SignUp
      <Link to="/auth/sign-in">Sign In</Link>
    </div>
  );
};

export default SignUp;
