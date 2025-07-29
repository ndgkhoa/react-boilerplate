import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Modal, Tooltip } from '~/components/ui';
import RoleForm from '~/features/role-control/role/components/role-form';
import type { Role } from '~/features/role-control/role/types/Role';

const UpdateRoleModal = ({ role }: { role?: Role }) => {
  if (!role) return null;

  const modalName = `update-role-modal-${role?.Id}`;

  return (
    <Modal>
      <Modal.Opens opens={modalName}>
        <Tooltip title="Cập nhật vai trò">
          <Button
            size="small"
            type="text"
            icon={<EditOutlined style={{ color: '#eab308', fontSize: 18 }} />}
          />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window name={modalName} modalProps={{ title: 'Cập nhật vai trò' }}>
        <RoleForm role={role} />
      </Modal.Window>
    </Modal>
  );
};

export default UpdateRoleModal;
