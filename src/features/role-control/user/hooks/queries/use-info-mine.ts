import { useQuery } from '@tanstack/react-query';

import { userApi } from '~/features/role-control/user/api/user-api';
import { userKeys } from '~/features/role-control/user/constants/user-keys';

export const useInfoMine = () => {
  return useQuery({
    queryKey: userKeys.infoMine(),
    queryFn: () => userApi.getInfoMine(),
  });
};
