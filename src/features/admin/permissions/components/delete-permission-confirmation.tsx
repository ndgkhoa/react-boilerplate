import { App, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { Notification } from '~/utils';
import { Popconfirm, Tooltip } from '~/components/ui';
import { useDeletePermission } from '~/features/admin/permissions/hooks/mutations/use-delete-permission';
import type { Permission } from '~/features/admin/permissions/types/Permission';
import { useTranslation } from 'react-i18next';

const DeletePermissionConfirmation = ({
  permissionId,
  onDeleteSuccess,
}: {
  permissionId?: Permission['Id'];
  onDeleteSuccess?: () => void;
}) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const deleteMutation = useDeletePermission();

  const onDeleteClick = async (id?: Permission['Id']) => {
    if (!id) return;
    try {
      const response = await deleteMutation.mutateAsync(id);
      deleteMutation.invalidate();
      message.success(Notification.success(response).message);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      message.error(Notification.error(error).message);
    }
  };

  return (
    <Popconfirm
      title={t('Common.Delete', { name: t('Fields.Permission') })}
      description={t('Common.ConfirmDelete', { name: t('Fields.Permission') })}
      onConfirm={() => onDeleteClick(permissionId)}
    >
      <Tooltip title={t('Common.Delete', { name: t('Fields.Permission') })}>
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
