import { useQuery } from '@tanstack/react-query';

import { permissionApi } from '~/features/admin/permissions/api/permission-api';
import { permissionKeys } from '~/features/admin/permissions/constants/permission-keys';
import type { PermissionSearchParams } from '~/features/admin/permissions/types/Permission';
import { cleanSearchParams } from '~/utils/clean-search-params';

export const usePermissionList = (params?: PermissionSearchParams) => {
  return useQuery({
    queryKey: permissionKeys.list(cleanSearchParams(params)),
    queryFn: () => permissionApi.getAll(cleanSearchParams(params)),
  });
};
