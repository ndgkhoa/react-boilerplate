import { App, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';

import { Popconfirm, Tooltip } from '~/components/ui';
import type { RolePermission } from '~/features/role-control/role/types/Role';
import { ServiceMessage } from '~/utils/service-message';
import { queryClient } from '~/config/query-client';
import { roleApi } from '~/features/role-control/role/api/role-api';

const DeleteRolePermissionsConfirmation = ({
  rolePermissionId,
}: {
  rolePermissionId?: RolePermission['Id'];
}) => {
  const { message } = App.useApp();

  const deleteMutation = useMutation({
    mutationFn: async (ids: RolePermission['Id'][]) => {
      return await roleApi.deletePermissions(ids);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['role', 'permissions'] });
      message.success(ServiceMessage.success(response).message);
    },
    onError: (error) => {
      message.error(ServiceMessage.error(error).message);
    },
  });

  const onDeleteClick = async (ids?: RolePermission['Id'][]) => {
    if (!ids || ids.length === 0) return;
    deleteMutation.mutate(ids);
  };

  return (
    <Popconfirm
      title="Xóa quyền"
      description="Bạn chắc chắn muốn xóa quyền này?"
      onConfirm={() => onDeleteClick([rolePermissionId!])}
    >
      <Tooltip title="Xóa quyền">
        <Button
          danger
          size="small"
          type="text"
          icon={<DeleteOutlined style={{ fontSize: 18 }} />}
        />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteRolePermissionsConfirmation;
