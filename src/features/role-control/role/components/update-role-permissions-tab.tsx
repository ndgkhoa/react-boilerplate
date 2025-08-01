import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { App, Checkbox, Table } from 'antd';
import type { TableProps } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ServiceMessage } from '~/utils';
import { queryClient } from '~/config/query-client';
import { roleApi } from '~/features/role-control/role/api/role-api';
import type {
  Role,
  RolePermission,
  UpdateRolePermissionsBody,
} from '~/features/role-control/role/types/Role';
import type { RolePermissionsTabRef } from '~/features/role-control/role/components/role-permissions-modal';
import DeleteRolePermissionsConfirmation from '~/features/role-control/role/components/delete-role-permissions-confirmation';

interface Props {
  roleId?: Role['Id'];
}

const UpdateRolePermissionsTab = forwardRef<RolePermissionsTabRef, Props>((props, ref) => {
  const { message } = App.useApp();

  const [permissions, setPermissions] = useState<RolePermission[]>([]);

  const rolePermissionsQuery = useQuery({
    queryKey: ['role', 'permissions', props.roleId],
    queryFn: () => roleApi.getPermissions(props.roleId!),
    enabled: !!props.roleId,
  });

  const initialPermissions = useMemo(() => {
    return rolePermissionsQuery.data?.data?.Data?.Permissions ?? [];
  }, [rolePermissionsQuery.data]);

  useEffect(() => {
    if (initialPermissions.length > 0) {
      setPermissions(initialPermissions.map((item: RolePermission) => ({ ...item })));
    }
  }, [initialPermissions]);

  const mutation = useMutation({
    mutationFn: (body: UpdateRolePermissionsBody) => roleApi.updatePermissions(body),
    onSuccess: (response) => {
      message.success(ServiceMessage.success(response).message);
      queryClient.invalidateQueries({ queryKey: ['role', 'permissions'] });
    },
    onError(error) {
      message.error(ServiceMessage.error(error).message);
    },
  });

  const handleCheck = (
    index: number,
    key: keyof Pick<RolePermission, 'C' | 'R' | 'U' | 'D'>,
    value: boolean
  ) => {
    const updated = [...permissions];
    updated[index][key] = value;
    setPermissions(updated);
  };

  const handleSubmit = () => {
    const payload = permissions.map(({ Id, C, R, U, D }) => ({
      Id,
      C,
      R,
      U,
      D,
    }));
    mutation.mutate(payload);
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    reset: () => {
      setPermissions(initialPermissions.map((item: RolePermission) => ({ ...item })));
    },
  }));

  const renderCheckbox =
    (key: keyof Pick<RolePermission, 'C' | 'R' | 'U' | 'D'>) =>
    (_: any, record: RolePermission, index: number) => (
      <Checkbox checked={record[key]} onChange={(e) => handleCheck(index, key, e.target.checked)} />
    );

  const columns: TableProps<RolePermission>['columns'] = [
    {
      title: '-',
      dataIndex: 'Id',
      key: 'Id',
      align: 'center' as const,
      render: (value) => {
        return <DeleteRolePermissionsConfirmation rolePermissionId={value} />;
      },
      width: 100,
    },
    { title: 'Tên quyền', dataIndex: 'PermissionName' },
    { title: 'C', dataIndex: 'C', render: renderCheckbox('C') },
    { title: 'R', dataIndex: 'R', render: renderCheckbox('R') },
    { title: 'U', dataIndex: 'U', render: renderCheckbox('U') },
    { title: 'D', dataIndex: 'D', render: renderCheckbox('D') },
  ];

  return (
    <Table<RolePermission>
      bordered
      rowKey="Id"
      columns={columns}
      loading={rolePermissionsQuery.isPending}
      dataSource={permissions}
      pagination={false}
    />
  );
});

export default UpdateRolePermissionsTab;
