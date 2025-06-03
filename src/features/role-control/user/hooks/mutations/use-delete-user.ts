import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { userApi } from '~/features/role-control/user/api/user-api';
import { userKeys } from '~/features/role-control/user/constants/user-keys';

type Variables = Parameters<typeof userApi.delete>[0];
type Data = Awaited<ReturnType<typeof userApi.delete>>;

queryClient.setMutationDefaults(userKeys.delete(), {
  mutationFn: (vars: Variables) => userApi.delete(vars),
});

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Data, Error, Variables>({
    mutationKey: userKeys.delete(),
  });

  const isMutating = useIsMutating({ mutationKey: userKeys.delete() });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: userKeys.all });
  };

  return { ...mutation, invalidate, isPending: mutation.isPending || Boolean(isMutating) };
};
