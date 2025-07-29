export const authKeys = {
  all: ['auth'],
  loginWithUserName: () => [...authKeys.all, 'login-with-username'],
  loginWithGoogle: () => [...authKeys.all, 'login-with-google'],
  verifyCode: () => [...authKeys.all, 'verify-code'],
  resendCode: () => [...authKeys.all, 'resend-code'],
};
