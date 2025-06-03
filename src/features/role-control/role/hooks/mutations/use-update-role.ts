import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { roleApi } from '~/features/role-control/role/api/role-api';
import { roleKeys } from '~/features/role-control/role/constants/role-keys';

type Variables = Parameters<typeof roleApi.update>[0];
type Data = Awaited<ReturnType<typeof roleApi.update>>;

queryClient.setMutationDefaults(roleKeys.update(), {
  mutationFn: (vars: Variables) => roleApi.update(vars),
});

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Data, Error, Variables>({
    mutationKey: roleKeys.update(),
  });

  const isMutating = useIsMutating({ mutationKey: roleKeys.update() });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: roleKeys.all });
  };

  return { ...mutation, invalidate, isPending: mutation.isPending || Boolean(isMutating) };
};
