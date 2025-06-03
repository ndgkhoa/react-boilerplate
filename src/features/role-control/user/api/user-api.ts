import type { AxiosRequestConfig } from 'axios';

import { axiosClient } from '~/config/axios';
import { env } from '~/config/env';
import type { User, UserSearchParams } from '~/features/role-control/user/types/User';
import type { BaseResponse } from '~/types';

const BASE_PATH = `${env.VITE_BASE_API_URL}/user`;

export const userApi = {
  getAll: (params?: UserSearchParams, config?: AxiosRequestConfig) => {
    const url = `${BASE_PATH}/get-list`;
    return axiosClient.get<BaseResponse<User[]>>(url, { params, ...config });
  },
  getOne: (id: User['Id'], config?: AxiosRequestConfig) => {
    return axiosClient.get(`${BASE_PATH}/get-by-id/${id}`, { ...config });
  },
  getInfoMine: () => {
    return axiosClient.get<{ User: User; Permissions: unknown[] }>(`${BASE_PATH}/get-info-mine`);
  },
  create: (formData: FormData) => {
    return axiosClient.post(`${BASE_PATH}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: ({ Id, formData }: { Id: string; formData: FormData }) => {
    return axiosClient.patch(`${BASE_PATH}/update/${Id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id: User['Id']) => {
    return axiosClient.delete(`${BASE_PATH}/delete/${id}`);
  },
};
