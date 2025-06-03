import { useQuery } from '@tanstack/react-query';

import { permissionApi } from '~/features/role-control/permission/api/permission-api';
import { permissionKeys } from '~/features/role-control/permission/constants/permission-keys';
import type { PermissionSearchParams } from '~/features/role-control/permission/types/Permission';
import { cleanSearchParams } from '~/utils/clean-search-params';

export const usePermissionList = (params?: PermissionSearchParams) => {
  return useQuery({
    queryKey: permissionKeys.list(cleanSearchParams(params)),
    queryFn: () => permissionApi.getAll(cleanSearchParams(params)),
  });
};
