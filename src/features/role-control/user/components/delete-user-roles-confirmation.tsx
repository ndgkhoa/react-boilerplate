import { App, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';

import { Popconfirm, Tooltip } from '~/components/ui';
import type { UserRole } from '~/features/role-control/user/types/User';
import { ServiceMessage } from '~/utils/service-message';
import { queryClient } from '~/config/query-client';
import { userApi } from '~/features/role-control/user/api/user-api';

const DeleteUserRolesConfirmation = ({ userRoleId }: { userRoleId?: UserRole['Id'] }) => {
  const { message } = App.useApp();

  const deleteMutation = useMutation({
    mutationFn: async (ids: UserRole['Id'][]) => {
      return await userApi.deleteRoles(ids);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'roles'] });
      message.success(ServiceMessage.success(response).message);
    },
    onError: (error) => {
      message.error(ServiceMessage.error(error).message);
    },
  });

  const onDeleteClick = async (ids?: UserRole['Id'][]) => {
    if (!ids || ids.length === 0) return;
    deleteMutation.mutate(ids);
  };

  return (
    <Popconfirm
      title="Xóa vai trò"
      description="Bạn chắc chắn muốn xóa vai trò này?"
      onConfirm={() => onDeleteClick([userRoleId!])}
    >
      <Tooltip title="Xóa vai trò">
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

export default DeleteUserRolesConfirmation;
