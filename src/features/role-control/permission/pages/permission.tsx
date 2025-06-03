import { Space } from 'antd';

import { useQueryParams } from '~/hooks/use-query-params';
import { SearchKeyword } from '~/components/inputs';
import { Container } from '~/components/ui';
import CreatePermissonModal from '~/features/role-control/permission/components/create-permission-model';
import PermissionList from '~/features/role-control/permission/components/permission-list';

const Permission = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  return (
    <Container
      title="Danh sách quyền"
      extraRight={
        <Space>
          <CreatePermissonModal />
          <SearchKeyword size="large" className="max-w-[12rem]" placeholder="Tìm kiếm" />
        </Space>
      }
    >
      <PermissionList
        searchParams={{
          keyword: queryParams.keyword,
          pageIndex: queryParams.page,
          pageSize: queryParams.pageSize,
        }}
        pagination={{
          current: queryParams.page,
          pageSize: queryParams.pageSize,
          onChange: (page: number, pageSize: number) => setQueryParams({ page, pageSize }),
        }}
      />
    </Container>
  );
};

export default Permission;
