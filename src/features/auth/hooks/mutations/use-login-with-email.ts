import { useIsMutating, useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { queryClient } from '~/config/query-client';
import { authApi } from '~/features/auth/api/auth-api';
import { authKeys } from '~/features/auth/constants/auth-keys';
import type { AuthType } from '~/features/auth/hooks/use-auth-store';
import type { BaseResponse } from '~/types';

type Variables = Parameters<typeof authApi.loginWithEmail>[0];

queryClient.setMutationDefaults(authKeys.loginWithEmailOrPhone(), {
  mutationFn: (variables: Variables) => authApi.loginWithEmail(variables),
});

export const useLoginWithEmail = () => {
  const mutation = useMutation<AxiosResponse<BaseResponse<AuthType>>, Error, Variables>({
    mutationKey: authKeys.loginWithEmailOrPhone(),
  });

  const isMutating = useIsMutating({ mutationKey: authKeys.loginWithEmailOrPhone() });

  const isPending = mutation.isPending || Boolean(isMutating);
  return { ...mutation, isPending };
};
