import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Modal, Tooltip } from '~/components/ui';
import RoleForm from '~/features/admin/roles/components/role-form';

const CreateRoleModal = () => {
  const { t } = useTranslation();

  return (
    <Modal>
      <Modal.Opens opens="create-role-modal">
        <Tooltip title={t('Common.Create', { name: t('Fields.Role') })}>
          <Button size="large" type="primary" icon={<PlusOutlined />} />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window
        name="create-role-modal"
        modalProps={{ title: t('Common.Create', { name: t('Fields.Permission') }) }}
      >
        <RoleForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateRoleModal;
