import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { userApi } from '~/features/role-control/user/api/user-api';
import { userKeys } from '~/features/role-control/user/constants/user-keys';

type Variables = Parameters<typeof userApi.create>[0];
type Data = Awaited<ReturnType<typeof userApi.create>>;

queryClient.setMutationDefaults(userKeys.create(), {
  mutationFn: (vars: Variables) => userApi.create(vars),
});

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Data, Error, Variables>({
    mutationKey: userKeys.create(),
  });

  const isMutating = useIsMutating({ mutationKey: userKeys.create() });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: userKeys.all });
  };

  return { ...mutation, invalidate, isPending: mutation.isPending || Boolean(isMutating) };
};
