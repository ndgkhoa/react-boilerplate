import { useIsMutating, useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '~/config/query-client';
import { authApi } from '~/features/auth/api/auth-api';
import { authKeys } from '~/features/auth/constants/auth-keys';
import type { BaseResponse } from '~/types';

queryClient.setMutationDefaults(authKeys.loginWithGoogle(), {
  mutationFn: () => authApi.loginWithGoogle(),
});

export const useLoginWithGoogle = () => {
  const mutation = useMutation<AxiosResponse<BaseResponse<{ message: string }>>, Error>({
    mutationKey: authKeys.loginWithGoogle(),
  });

  const isMutating = useIsMutating({ mutationKey: authKeys.loginWithGoogle() });

  const isPending = mutation.isPending || Boolean(isMutating);
  return { ...mutation, isPending };
};
