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

export interface RolePermission {
  Id: string;
  PermissionId: string;
  PermissionName: string;
  C: boolean; // Create
  R: boolean; // Read
  U: boolean; // Update
  D: boolean; // Delete
}

export type CreateRolePermissionsBody = Pick<
  RolePermission,
  'PermissionId' | 'C' | 'R' | 'U' | 'D'
>[];
export type UpdateRolePermissionsBody = Partial<RolePermission>[];

export type RoleSearchParams = Pick<BaseSearchParams, 'pageSize' | 'pageIndex' | 'keyword'>;
