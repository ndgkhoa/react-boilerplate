import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Modal, Tooltip } from '~/components/ui';
import RoleForm from '~/features/role-control/role/components/role-form';

const CreateRoleModal = () => {
  return (
    <Modal>
      <Modal.Opens opens="create-role-modal">
        <Tooltip title="Thêm vai trò">
          <Button size="large" type="primary" icon={<PlusOutlined />} />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window name="create-role-modal" modalProps={{ title: 'Thêm vai trò' }}>
        <RoleForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateRoleModal;
