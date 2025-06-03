import type { BaseEntity, BaseSearchParams } from '~/types';

export interface Permission extends BaseEntity {
  Id: string;
  PermissionCode: string;
  PermissionName: string;
  Description: string;
}

export type CreatePermissionBody = Pick<
  Permission,
  'PermissionCode' | 'PermissionName' | 'Description'
>;
export type UpdatePermissionBody = Partial<CreatePermissionBody> & {
  Id: Permission['Id'];
};

export type PermissionSearchParams = Pick<BaseSearchParams, 'pageSize' | 'pageIndex' | 'keyword'>;
