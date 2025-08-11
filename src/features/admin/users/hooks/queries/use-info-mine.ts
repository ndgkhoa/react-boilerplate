import { useQuery } from '@tanstack/react-query';

import { userApi } from '~/features/admin/users/api/user-api';
import { userKeys } from '~/features/admin/users/constants/user-keys';

export const useInfoMine = () => {
  return useQuery({
    queryKey: userKeys.infoMine(),
    queryFn: () => userApi.getInfoMine(),
  });
};
