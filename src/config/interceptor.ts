import { message } from 'antd';

import { axiosClient } from '~/config/axios';

let isrAttached = false;
let hasShown401Message = false;

export function setup() {
  if (isrAttached) return;
  isrAttached = true;

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;

      if (status === 401 && !hasShown401Message) {
        hasShown401Message = true;

        await message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        localStorage.clear();
        window.location.href = '/auth/sign-in';
      }

      if (status === 403) {
        await message.error('Bạn không có quyền truy cập vào tài nguyên này.');
        window.location.href = '/';
      }

      return Promise.reject(error);
    }
  );
}
