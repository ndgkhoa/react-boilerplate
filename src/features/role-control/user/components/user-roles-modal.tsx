import { useRef, useState } from 'react';
import { Button, Flex, Modal, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { SecurityScanOutlined } from '@ant-design/icons';

import { Tooltip } from '~/components/ui';
import type { User } from '~/features/role-control/user/types/User';
import CreateUserRolesTab from '~/features/role-control/user/components/create-user-roles-tab';
import UpdateUserRolesTab from '~/features/role-control/user/components/update-user-roles-tab';

export interface UserRolesTabRef {
  submit: () => void;
  reset: () => void;
}

const UserRolesModal = ({ user }: { user?: User }) => {
  if (!user) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('1');
  const updateTabRef = useRef<UserRolesTabRef>(null);
  const createTabRef = useRef<UserRolesTabRef>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (activeTabKey === '1') {
      const success = updateTabRef.current?.submit();
      if (success) setIsModalOpen(false);
    } else {
      const success = createTabRef.current?.submit();
      if (success) {
        setActiveTabKey('1');
      }
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
      children: <UpdateUserRolesTab ref={updateTabRef} userId={user.Id} />,
    },
    {
      key: '2',
      label: 'Thêm',
      children: <CreateUserRolesTab ref={createTabRef} userId={user.Id} />,
    },
  ];

  return (
    <>
      <Tooltip title="Cập nhật vai trò của người dùng">
        <Button
          size="small"
          type="text"
          icon={<SecurityScanOutlined style={{ color: '#3b82f6', fontSize: 18 }} />}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title={`Danh sách vai trò của người dùng ${user.UserName}`}
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

export default UserRolesModal;
