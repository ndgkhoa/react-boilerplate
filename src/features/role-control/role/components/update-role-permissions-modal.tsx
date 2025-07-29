import { useRef, useState } from 'react';
import { Button, Flex, Modal, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { SecurityScanOutlined } from '@ant-design/icons';

import { Tooltip } from '~/components/ui';
import type { Role } from '~/features/role-control/role/types/Role';
import UpdateRolePermissionsTab from '~/features/role-control/role/components/update-role-permissions-tab';
import CreateRolePermissionsTab from '~/features/role-control/role/components/create-role-permissions-tab';

export interface RolePermissionsTabRef {
  submit: () => void;
  reset: () => void;
}

const UpdateRolePermissionsModal = ({ role }: { role?: Role }) => {
  if (!role) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('1');
  const updateTabRef = useRef<RolePermissionsTabRef>(null);
  const createTabRef = useRef<RolePermissionsTabRef>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (activeTabKey === '1') {
      updateTabRef.current?.submit();
    } else {
      createTabRef.current?.submit();
      setActiveTabKey('1');
    }
  };

  const handleCancel = () => {
    if (activeTabKey === '1') {
      updateTabRef.current?.reset();
    } else {
      createTabRef.current?.reset();
      setActiveTabKey('1');
    }
    setIsModalOpen(false);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Cập nhật',
      children: <UpdateRolePermissionsTab ref={updateTabRef} roleId={role.Id} />,
    },
    {
      key: '2',
      label: 'Thêm',
      children: <CreateRolePermissionsTab ref={createTabRef} roleId={role.Id} />,
    },
  ];

  return (
    <>
      <Tooltip title="Cập nhật quyền của vai trò">
        <Button
          size="small"
          type="text"
          icon={<SecurityScanOutlined style={{ color: '#3b82f6', fontSize: 18 }} />}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title={`Danh sách quyền của vai trò ${role.RoleName}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        footer={
          <Flex gap="middle" align="center" justify="end">
            <Button onClick={handleCancel}>Hủy bỏ</Button>
            <Button type="primary" onClick={handleOk}>
              Xác nhận
            </Button>
          </Flex>
        }
      >
        <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} items={items} />
      </Modal>
    </>
  );
};

export default UpdateRolePermissionsModal;
