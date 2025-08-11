import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Flex, Layout, Select } from 'antd';

import { useAuthStore } from '~/stores/auth';
import { usePreferencesStore } from '~/stores/preferences';
import { AuthProviders } from '~/features/auth/types/AuthProviders';

export const Navbar = memo(() => {
  const { t } = useTranslation();
  const authState = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);
  const setLanguage = usePreferencesStore((state) => state.setLanguage);

  const onLogoutClick = () => {
    if (authState?.provider === AuthProviders.Local) {
      logout();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('Common.Logout'),
      onClick: onLogoutClick,
    },
  ];

  return (
    <Layout.Header className="!bg-primary flex !px-4">
      <Flex className="!w-full" align="center" justify="end" gap="middle">
        <Select
          defaultValue="en"
          onChange={(value) => setLanguage(value)}
          options={[
            { value: 'vi', label: t('Common.Vi') },
            { value: 'en', label: t('Common.En') },
          ]}
        />
        <Dropdown menu={{ items }} trigger={['hover']}>
          <Avatar
            className="cursor-pointer transition-colors duration-200 hover:!bg-[#4096FF]"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
});
