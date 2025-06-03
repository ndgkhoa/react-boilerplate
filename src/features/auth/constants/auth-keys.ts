export const authKeys = {
  all: ['auth'],
  loginWithEmailOrPhone: () => [...authKeys.all, 'login-with-email-or-phone'],
  loginWithGoogle: () => [...authKeys.all, 'login-with-google'],
  loginWithMicrosoft: () => [...authKeys.all, 'login-with-microsoft'],
  verifyCode: () => [...authKeys.all, 'verify-code'],
  resendCode: () => [...authKeys.all, 'resend-code'],
};
