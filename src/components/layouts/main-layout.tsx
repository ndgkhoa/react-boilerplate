import { memo, Suspense } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { FullPageFallback } from '~/components/fallbacks';
import { Sidebar, Navbar, Footer } from '~/components/ui';
import { useAuthStore } from '~/stores/auth';
import { useSyncAccessToken } from '~/hooks/use-sync-access-token';

const LayoutContent = memo(() => {
  return (
    <Layout.Content className="h-[calc(100vh)] border-t border-gray-200 px-4">
      {/* <Breadcrumb className="!py-4" items={[{ title: 'User' }, { title: 'Bill' }]} /> */}
      <Suspense fallback={<FullPageFallback />}>
        <Outlet />
      </Suspense>
    </Layout.Content>
  );
});

export const MainLayout = () => {
  const authState = useAuthStore((state) => state.auth);
  useSyncAccessToken(authState);

  // const infoMine = useInfoMine();
  // useSyncPermissions(infoMine);

  return (
    <Layout className="h-screen w-screen overflow-hidden">
      <Sidebar />
      <Layout>
        <Navbar />
        <LayoutContent />
        <Footer />
      </Layout>
    </Layout>
  );
};
