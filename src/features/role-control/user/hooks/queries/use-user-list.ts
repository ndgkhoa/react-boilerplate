import { useQuery } from '@tanstack/react-query';

import { userApi } from '~/features/role-control/user/api/user-api';
import { userKeys } from '~/features/role-control/user/constants/user-keys';
import type { UserSearchParams } from '~/features/role-control/user/types/User';
import { cleanSearchParams } from '~/utils/clean-search-params';

export const useUserList = (params?: UserSearchParams) => {
  return useQuery({
    queryKey: userKeys.list(cleanSearchParams(params)),
    queryFn: () => userApi.getAll(cleanSearchParams(params)),
  });
};
