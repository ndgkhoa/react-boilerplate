import { useQuery } from '@tanstack/react-query';

import { roleApi } from '~/features/role-control/role/api/role-api';
import { roleKeys } from '~/features/role-control/role/constants/role-keys';
import type { RoleSearchParams } from '~/features/role-control/role/types/Role';
import { cleanSearchParams } from '~/utils/clean-search-params';

export const useRoleList = (params?: RoleSearchParams) => {
  return useQuery({
    queryKey: roleKeys.list(cleanSearchParams(params)),
    queryFn: () => roleApi.getAll(cleanSearchParams(params)),
  });
};
