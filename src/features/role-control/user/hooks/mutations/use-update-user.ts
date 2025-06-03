import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { userApi } from '~/features/role-control/user/api/user-api';
import { userKeys } from '~/features/role-control/user/constants/user-keys';

type Variables = Parameters<typeof userApi.update>[0];
type Data = Awaited<ReturnType<typeof userApi.update>>;

queryClient.setMutationDefaults(userKeys.update(), {
  mutationFn: (vars: Variables) => userApi.update(vars),
});

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Data, Error, Variables>({
    mutationKey: userKeys.update(),
  });

  const isMutating = useIsMutating({ mutationKey: userKeys.update() });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: userKeys.all });
  };

  return { ...mutation, invalidate, isPending: mutation.isPending || Boolean(isMutating) };
};
