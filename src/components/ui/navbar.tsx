import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LogoutOutlined, MoonOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex, Layout, Select, theme as antdTheme } from 'antd';

import { useAuthStore } from '~/stores/auth';
import { usePreferencesStore } from '~/stores/preferences';
import { AuthProviders } from '~/features/auth/types/AuthProviders';

export const Navbar = memo(() => {
  const { t } = useTranslation();
  const { auth: authState, logout } = useAuthStore();
  const { theme, setTheme, setLanguage } = usePreferencesStore();
  const {
    token: { colorBgContainer },
  } = antdTheme.useToken();

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
    <Layout.Header style={{ display: 'flex', padding: '0 16px', background: colorBgContainer }}>
      <Flex align="center" justify="end" gap="middle" style={{ width: '100%' }}>
        <Select
          defaultValue="en"
          onChange={(value) => setLanguage(value)}
          options={[
            { value: 'vi', label: t('Common.Vi') },
            { value: 'en', label: t('Common.En') },
          ]}
        />
        <Button
          shape="circle"
          icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <Dropdown menu={{ items }} trigger={['hover']}>
          <Button shape="circle" icon={<UserOutlined />} />
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
});
