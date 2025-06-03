export const roleKeys = {
  all: ['role'],
  lists: () => [...roleKeys.all, 'list'],
  list: (params?: unknown) => [...roleKeys.lists(), params],
  details: () => [...roleKeys.all, 'details'],
  detail: (id?: string) => [...roleKeys.details(), id],
  create: () => [...roleKeys.all, 'create'],
  update: () => [...roleKeys.all, 'update'],
  delete: () => [...roleKeys.all, 'delete'],
};
