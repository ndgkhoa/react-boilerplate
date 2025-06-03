import { Space } from 'antd';

import { useQueryParams } from '~/hooks/use-query-params';
import { SearchKeyword } from '~/components/inputs';
import { Container } from '~/components/ui';
import CreateUserModal from '~/features/role-control/user/components/create-user-model';
import UserList from '~/features/role-control/user/components/user-list';

const User = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  return (
    <Container
      title="Danh sách người dùng"
      extraRight={
        <Space>
          <CreateUserModal />
          <SearchKeyword size="large" className="max-w-[12rem]" placeholder="Tìm kiếm" />
        </Space>
      }
    >
      <UserList
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

export default User;
