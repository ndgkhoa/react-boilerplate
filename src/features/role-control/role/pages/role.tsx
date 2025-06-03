import { Space } from 'antd';

import { useQueryParams } from '~/hooks/use-query-params';
import { SearchKeyword } from '~/components/inputs';
import { Container } from '~/components/ui';
import CreateRoleModal from '~/features/role-control/role/components/create-role-model';
import RoleList from '~/features/role-control/role/components/role-list';

const Role = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  return (
    <Container
      title="Danh sách vai trò"
      extraRight={
        <Space>
          <CreateRoleModal />
          <SearchKeyword size="large" className="max-w-[12rem]" placeholder="Tìm kiếm" />
        </Space>
      }
    >
      <RoleList
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

export default Role;
