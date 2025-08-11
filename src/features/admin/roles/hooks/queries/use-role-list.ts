import { useQuery } from '@tanstack/react-query';

import { roleApi } from '~/features/admin/roles/api/role-api';
import { roleKeys } from '~/features/admin/roles/constants/role-keys';
import type { RoleSearchParams } from '~/features/admin/roles/types/Role';
import { cleanSearchParams } from '~/utils/clean-search-params';

export const useRoleList = (params?: RoleSearchParams) => {
  return useQuery({
    queryKey: roleKeys.list(cleanSearchParams(params)),
    queryFn: () => roleApi.getAll(cleanSearchParams(params)),
  });
};
