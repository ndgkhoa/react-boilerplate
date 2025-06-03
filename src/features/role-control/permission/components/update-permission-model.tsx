import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Modal, Tooltip } from '~/components/ui';
import PermissionForm from '~/features/role-control/permission/components/permission-form';
import type { Permission } from '~/features/role-control/permission/types/Permission';

const UpdatePermissionModal = ({ permission }: { permission?: Permission }) => {
  if (!permission) return null;

  const modalName = `update-permission-modal-${permission?.Id}`;

  return (
    <Modal>
      <Modal.Opens opens={modalName}>
        <Tooltip title="Cập nhật quyền">
          <Button
            size="small"
            type="text"
            icon={<EditOutlined style={{ color: '#eab308', fontSize: 18 }} />}
          />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window name={modalName} modalProps={{ title: 'Cập nhật quyền' }}>
        <PermissionForm permission={permission} />
      </Modal.Window>
    </Modal>
  );
};

export default UpdatePermissionModal;
