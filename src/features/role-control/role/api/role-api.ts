import type { AxiosRequestConfig } from 'axios';

import { axiosClient } from '~/config/axios';
import { env } from '~/config/env';
import type {
  CreateRoleBody,
  Role,
  RoleSearchParams,
  UpdateRoleBody,
} from '~/features/role-control/role/types/Role';
import type { BaseResponse } from '~/types';

const BASE_PATH = `${env.VITE_BASE_API_URL}/role`;

export const roleApi = {
  getAll: (params?: RoleSearchParams, config?: AxiosRequestConfig) => {
    const url = `${BASE_PATH}/get-list`;
    return axiosClient.get<BaseResponse<Role[]>>(url, { params, ...config });
  },
  getOne: (id: Role['Id'], config?: AxiosRequestConfig) => {
    return axiosClient.get(`${BASE_PATH}/get-by-id/${id}`, { ...config });
  },
  create: (body: CreateRoleBody) => {
    return axiosClient.post(`${BASE_PATH}/create`, body);
  },
  update: ({ Id, ...body }: UpdateRoleBody) => {
    return axiosClient.patch(`${BASE_PATH}/update/${Id}`, body);
  },
  delete: (id: Role['Id']) => {
    return axiosClient.delete(`${BASE_PATH}/delete/${id}`);
  },
};
