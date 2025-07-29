import { Button } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons';

import { Modal, Tooltip } from '~/components/ui';
import UserForm from '~/features/role-control/user/components/user-form';
import type { User } from '~/features/role-control/user/types/User';

const UpdateUserRolesModal = ({ user }: { user?: User }) => {
  if (!user) return null;

  const modalName = `update-user-roles-modal-${user?.Id}`;

  return (
    <Modal>
      <Modal.Opens opens={modalName}>
        <Tooltip title="Cập nhật vai trò cho người dùng">
          <Button
            size="small"
            type="text"
            icon={<UserSwitchOutlined style={{ color: '#22c55e', fontSize: 18 }} />}
          />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window name={modalName} modalProps={{ title: 'Cập nhật người dùng', width: '900px' }}>
        <UserForm user={user} />
      </Modal.Window>
    </Modal>
  );
};

export default UpdateUserRolesModal;
