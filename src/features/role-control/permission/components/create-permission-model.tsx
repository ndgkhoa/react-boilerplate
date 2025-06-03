import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Modal, Tooltip } from '~/components/ui';
import PermissionForm from '~/features/role-control/permission/components/permission-form';

const CreatePermissonModal = () => {
  return (
    <Modal>
      <Modal.Opens opens="create-permission-modal">
        <Tooltip title="Thêm quuyền">
          <Button size="large" type="primary" icon={<PlusOutlined />} />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window name="create-permission-modal" modalProps={{ title: 'Thêm quyền' }}>
        <PermissionForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreatePermissonModal;
