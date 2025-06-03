import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Modal, Tooltip } from '~/components/ui';
import UserForm from '~/features/role-control/user/components/user-form';

const CreateUserModal = () => {
  return (
    <Modal>
      <Modal.Opens opens="create-user-modal">
        <Tooltip title="Thêm người dùng">
          <Button size="large" type="primary" icon={<PlusOutlined />} />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window
        name="create-user-modal"
        modalProps={{ title: 'Thêm người dùng', width: '900px' }}
      >
        <UserForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateUserModal;
