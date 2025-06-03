import { axiosClient } from '~/config/axios';
import type { BaseResponse } from '~/types';
import { delayPromise } from '~/utils';

import type { AuthType } from '~/features/auth/hooks/use-auth-store';

const BASE_PATH = '/user';

export const authApi = {
  loginWithEmail: (body: { UserName: string; Password: string }) => {
    return axiosClient.post<BaseResponse<AuthType>>(`${BASE_PATH}/login`, body, {
      headers: { X_DEVICE_UDID: '00000000-0000-0000-0000-000000000000' },
    });
  },
  loginWithGoogle: async () => {
    await delayPromise();
    return Promise.resolve({ message: 'Success' });
  },
  loginWithMicrosoft: async () => {
    await delayPromise();
    return Promise.resolve({ message: 'Success' });
  },
  verifyCode: async (code: string) => {
    await delayPromise();
    return Promise.resolve({ message: 'Success', data: code });
  },
  resendCode: async (data: string) => {
    await delayPromise();
    return Promise.resolve({ message: 'Success', data });
  },
};
