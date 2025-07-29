import { useEffect } from 'react';
import type { AxiosResponse } from 'axios';

import { useAuthStore } from '~/features/auth/hooks/use-auth-store';
import { type UseQueryResult } from '@tanstack/react-query';
import type { User } from '~/features/role-control/user/types/User';

export const useSyncPermissions = (
  infoMine: UseQueryResult<
    AxiosResponse<
      {
        User: User;
        Permissions: unknown[];
      },
      any
    >,
    Error
  >
) => {
  const setPerms = useAuthStore((state) => state.setPerms);

  useEffect(() => {
    const permissions = infoMine.data?.data?.Permissions;
    if (infoMine.isSuccess && permissions) {
      setPerms(permissions);
    }
  }, [infoMine.isSuccess, infoMine.data?.data?.Permissions, setPerms]);
};
