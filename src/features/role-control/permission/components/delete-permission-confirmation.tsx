import { App, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { Popconfirm, Tooltip } from '~/components/ui';
import { useDeletePermission } from '~/features/role-control/permission/hooks/mutations/use-delete-permission';
import type { Permission } from '~/features/role-control/permission/types/Permission';
import { ServiceMessage } from '~/utils/service-message';

const DeletePermissionConfirmation = ({
  permissionId,
  onDeleteSuccess,
}: {
  permissionId?: Permission['Id'];
  onDeleteSuccess?: () => void;
}) => {
  const { message } = App.useApp();
  const deleteMutation = useDeletePermission();

  const onDeleteClick = async (id?: Permission['Id']) => {
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
      title="Xóa quyền"
      description="Bạn chắc chắn muốn xóa quyền này?"
      onConfirm={() => onDeleteClick(permissionId)}
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

export default DeletePermissionConfirmation;
