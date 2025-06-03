import { memo } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Flex, Layout } from 'antd';

import { useAuthStore } from '~/features/auth/hooks/use-auth-store';
import { AuthProviders } from '~/features/auth/types/AuthProviders';

export const Navbar = memo(() => {
  const authState = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);

  const onLogoutClick = () => {
    if (authState?.provider === AuthProviders.Local) {
      logout();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: onLogoutClick,
    },
  ];

  return (
    <Layout.Header className="flex border-l border-white !px-4">
      <Flex className="!w-full" align="center" justify="end">
        <Dropdown menu={{ items }} trigger={['click']}>
          <Avatar className="!bg-[#87d068]" icon={<UserOutlined />} />
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
});
