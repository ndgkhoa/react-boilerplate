import { useQuery } from '@tanstack/react-query';

import { userApi } from '~/features/admin/users/api/user-api';
import { userKeys } from '~/features/admin/users/constants/user-keys';
import type { UserSearchParams } from '~/features/admin/users/types/User';
import { cleanSearchParams } from '~/utils/clean-search-params';

export const useUserList = (params?: UserSearchParams) => {
  return useQuery({
    queryKey: userKeys.list(cleanSearchParams(params)),
    queryFn: () => userApi.getAll(cleanSearchParams(params)),
  });
};
