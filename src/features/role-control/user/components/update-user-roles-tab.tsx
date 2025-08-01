import { forwardRef, useImperativeHandle } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useQuery } from '@tanstack/react-query';

import { userApi } from '~/features/role-control/user/api/user-api';
import type { User, UserRole } from '~/features/role-control/user/types/User';
import type { UserRolesTabRef } from '~/features/role-control/user/components/user-roles-modal';
import DeleteUserRolesConfirmation from '~/features/role-control/user/components/delete-user-roles-confirmation';

interface Props {
  userId?: User['Id'];
}

const UpdateUserRolesTab = forwardRef<UserRolesTabRef, Props>((props, ref) => {
  const userRolesQuery = useQuery({
    queryKey: ['user', 'roles', props.userId],
    queryFn: () => userApi.getRoles(props.userId!),
    enabled: !!props.userId,
  });

  const handleSubmit = () => {
    return true;
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    reset: () => {},
  }));

  const columns: TableProps<UserRole>['columns'] = [
    {
      title: '-',
      dataIndex: 'Id',
      key: 'Id',
      align: 'center' as const,
      render: (value) => {
        return <DeleteUserRolesConfirmation userRoleId={value} />;
      },
      width: 100,
    },
    { title: 'Tên vai trò', dataIndex: 'RoleName' },
    { title: 'Mô tả', dataIndex: 'Description' },
  ];

  return (
    <Table<UserRole>
      bordered
      rowKey="Id"
      columns={columns}
      loading={userRolesQuery.isPending}
      dataSource={userRolesQuery.data?.data.Data}
      pagination={false}
    />
  );
});

export default UpdateUserRolesTab;
