import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { App, Checkbox, Table } from 'antd';
import type { TableProps } from 'antd';
import { useQuery, useMutation } from '@tanstack/react-query';

import { ServiceMessage } from '~/utils';
import { queryClient } from '~/config/query-client';
import { roleApi } from '~/features/role-control/role/api/role-api';
import { permissionApi } from '~/features/role-control/permission/api/permission-api';
import type { RolePermissionsTabRef } from '~/features/role-control/role/components/update-role-permissions-modal';
import type {
  CreateRolePermissionsBody,
  Role,
  RolePermission,
} from '~/features/role-control/role/types/Role';
import type { Permission } from '~/features/role-control/permission/types/Permission';

interface Props {
  roleId?: Role['Id'];
}

interface DataType {
  PermissionId: string;
  PermissionName: string;
  C: boolean;
  R: boolean;
  U: boolean;
  D: boolean;
}

const CreateRolePermissionsTab = forwardRef<RolePermissionsTabRef, Props>((props, ref) => {
  const { message } = App.useApp();

  const [selectedPermissions, setSelectedPermissions] = useState<DataType[]>([]);
  const [initialPermissions, setInitialPermissions] = useState<DataType[]>([]);

  const { data: rolePermissionData, isPending: isRolePermissionPending } = useQuery({
    queryKey: ['role', 'permissions', props.roleId],
    queryFn: () => roleApi.getPermissions(props.roleId!),
    enabled: !!props.roleId,
  });

  const { data: allPermissionsData, isPending: isAllPermissionsPending } = useQuery({
    queryKey: ['permissions', 'all'],
    queryFn: () => permissionApi.getAll(),
  });

  const rolePermissions: RolePermission[] = rolePermissionData?.data.Data.Permissions ?? [];
  const allPermissions: Permission[] = allPermissionsData?.data.Data ?? [];

  const filteredPermissions: DataType[] = useMemo(() => {
    return allPermissions
      .filter((p) => !rolePermissions.some((rp) => rp.PermissionId === p.Id))
      .map((p) => ({
        PermissionId: p.Id,
        PermissionName: p.PermissionName,
        C: false,
        R: false,
        U: false,
        D: false,
      }));
  }, [allPermissions, rolePermissions]);

  useEffect(() => {
    if (
      JSON.stringify(selectedPermissions) !== JSON.stringify(filteredPermissions) ||
      JSON.stringify(initialPermissions) !== JSON.stringify(filteredPermissions)
    ) {
      setSelectedPermissions(filteredPermissions);
      setInitialPermissions(filteredPermissions);
    }
  }, [filteredPermissions]);

  const toggleCheckbox = (
    index: number,
    key: keyof Omit<DataType, 'PermissionId' | 'PermissionName'>
  ) => {
    setSelectedPermissions((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: !updated[index][key],
      };
      return updated;
    });
  };

  const mutation = useMutation({
    mutationFn: (body: CreateRolePermissionsBody) =>
      roleApi.createPermissions({
        roleId: props.roleId!,
        body,
      }),
    onSuccess: (res) => {
      message.success(ServiceMessage.success(res).message);
      queryClient.invalidateQueries({
        queryKey: ['role', 'permissions', props.roleId],
      });
    },
    onError: (err) => {
      message.error(ServiceMessage.error(err).message);
    },
  });

  const handleSubmit = () => {
    const payload = selectedPermissions
      .filter(({ C, R, U, D }) => C || R || U || D)
      .map(({ PermissionId, C, R, U, D }) => ({
        PermissionId,
        C,
        R,
        U,
        D,
      }));

    if (payload.length === 0) {
      message.warning('Vui lòng chọn ít nhất một quyền');
      return;
    }

    mutation.mutate(payload);
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    reset: () => {
      setSelectedPermissions(initialPermissions);
    },
  }));

  const renderCheckbox =
    (key: keyof Pick<DataType, 'C' | 'R' | 'U' | 'D'>) => (_: any, __: DataType, index: number) => (
      <Checkbox
        checked={selectedPermissions[index]?.[key]}
        onChange={() => toggleCheckbox(index, key)}
      />
    );

  const columns: TableProps<DataType>['columns'] = [
    { title: 'Tên quyền', dataIndex: 'PermissionName' },
    { title: 'C', render: renderCheckbox('C') },
    { title: 'R', render: renderCheckbox('R') },
    { title: 'U', render: renderCheckbox('U') },
    { title: 'D', render: renderCheckbox('D') },
  ];

  return (
    <Table
      bordered
      rowKey="PermissionId"
      columns={columns}
      dataSource={selectedPermissions}
      pagination={false}
      loading={isRolePermissionPending || isAllPermissionsPending}
    />
  );
});

export default CreateRolePermissionsTab;
