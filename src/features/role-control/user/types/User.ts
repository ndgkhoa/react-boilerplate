import type { BaseEntity, BaseSearchParams } from '~/types';

export interface User extends BaseEntity {
  Id: string;
  UserName: string;
  Email: string;
  PhoneNumber: string;
  FullName: string;
  Avatar: string;
}

export type CreateUserBody = Pick<
  User,
  'UserName' | 'Email' | 'PhoneNumber' | 'FullName' | 'Avatar'
>;
export type UpdateUserBody = Partial<CreateUserBody> & {
  Id: User['Id'];
};

export type UserSearchParams = Pick<BaseSearchParams, 'pageSize' | 'pageIndex' | 'keyword'>;
