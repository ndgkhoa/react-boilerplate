import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { roleApi } from '~/features/role-control/role/api/role-api';
import { roleKeys } from '~/features/role-control/role/constants/role-keys';

type Variables = Parameters<typeof roleApi.delete>[0];
type Data = Awaited<ReturnType<typeof roleApi.delete>>;

queryClient.setMutationDefaults(roleKeys.delete(), {
  mutationFn: (vars: Variables) => roleApi.delete(vars),
});

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Data, Error, Variables>({
    mutationKey: roleKeys.delete(),
  });

  const isMutating = useIsMutating({ mutationKey: roleKeys.delete() });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: roleKeys.all });
  };

  return { ...mutation, invalidate, isPending: mutation.isPending || Boolean(isMutating) };
};
