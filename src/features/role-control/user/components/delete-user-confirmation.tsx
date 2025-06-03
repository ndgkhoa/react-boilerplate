import { App, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { Popconfirm, Tooltip } from '~/components/ui';
import { useDeleteUser } from '~/features/role-control/user/hooks/mutations/use-delete-user';
import type { User } from '~/features/role-control/user/types/User';
import { ServiceMessage } from '~/utils/service-message';

const DeleteUserConfirmation = ({
  userId,
  onDeleteSuccess,
}: {
  userId?: User['Id'];
  onDeleteSuccess?: () => void;
}) => {
  const { message } = App.useApp();
  const deleteMutation = useDeleteUser();

  const onDeleteClick = async (id?: User['Id']) => {
    if (!id) return;
    try {
      const response = await deleteMutation.mutateAsync(id);
      deleteMutation.invalidate();
      message.success(ServiceMessage.success(response).message);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      message.error(ServiceMessage.error(error).message);
    }
  };

  return (
    <Popconfirm
      title="Xóa người dùng"
      description="Bạn chắc chắn muốn xóa người dùng này?"
      onConfirm={() => onDeleteClick(userId)}
    >
      <Tooltip title="Xóa người dùng">
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

export default DeleteUserConfirmation;
