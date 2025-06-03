import { memo, Suspense, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { axiosClient } from '~/config/axios';
import { FullPageFallback } from '~/components/fallbacks';
import { Sidebar, Navbar } from '~/components/ui';
import { useAuthStore } from '~/features/auth/hooks/use-auth-store';
import { AuthProviders } from '~/features/auth/types/AuthProviders';

const LayoutContent = memo(() => {
  return (
    <Layout.Content className="h-[calc(100vh)]">
      <Suspense fallback={<FullPageFallback />}>
        <Outlet />
      </Suspense>
    </Layout.Content>
  );
});

export const MainLayout = () => {
  const authState = useAuthStore((state) => state.auth);

  useEffect(() => {
    if (authState?.provider === AuthProviders.Local) {
      axiosClient.setAccessToken(authState.AccessToken);
    }
  }, [authState]);

  return (
    <Layout className="h-screen w-screen overflow-hidden">
      <Sidebar />
      <Layout>
        <Navbar />
        <LayoutContent />
      </Layout>
    </Layout>
  );
};
