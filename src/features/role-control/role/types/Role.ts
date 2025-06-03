import type { BaseEntity, BaseSearchParams } from '~/types';

export interface Role extends BaseEntity {
  Id: string;
  RoleName: string;
  Description: string;
}

export type CreateRoleBody = Pick<Role, 'RoleName' | 'Description'>;
export type UpdateRoleBody = Partial<CreateRoleBody> & {
  Id: Role['Id'];
};

export type RoleSearchParams = Pick<BaseSearchParams, 'pageSize' | 'pageIndex' | 'keyword'>;
