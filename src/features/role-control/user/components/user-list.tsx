import type { TableProps } from 'antd';
import { Empty, Space, Table } from 'antd';
import dayjs from 'dayjs';

import { ErrorPage } from '~/components/errors';
import { DateTimeFormat } from '~/constants/datetime-format';
import { useQueryParams } from '~/hooks/use-query-params';
import { useUserList } from '~/features/role-control/user/hooks/queries/use-user-list';
import type { User, UserSearchParams } from '~/features/role-control/user/types/User';
import UpdateUserModal from '~/features/role-control/user/components/update-user-modal';
import DeleteUserConfirmation from '~/features/role-control/user/components/delete-user-confirmation';
import UpdateUserRolesModal from '~/features/role-control/user/components/update-user-roles-modal';

const UserList = (props: TableProps<User> & { searchParams?: UserSearchParams }) => {
  const { searchParams, ...tableProps } = props;
  const userQuery = useUserList(searchParams);

  const { queryParams, setQueryParams } = useQueryParams();

  const handleDeleteSuccess = () => {
    const currentPage = queryParams.page || 1;
    const pageSize = queryParams.pageSize || 10;

    const totalRecordsAfterDelete = (userQuery.data?.data?.TotalRecord ?? 1) - 1;
    const totalPagesAfterDelete = Math.ceil(totalRecordsAfterDelete / pageSize);

    const newPage =
      currentPage > totalPagesAfterDelete && currentPage > 1 ? currentPage - 1 : currentPage;
    setQueryParams({ page: newPage, pageSize });
  };

  const columns: TableProps<User>['columns'] = [
    {
      title: '-',
      dataIndex: 'Id',
      key: 'Id',
      align: 'center' as const,
      render: (value, record) => {
        return (
          <Space>
            <UpdateUserModal user={record} />
            <DeleteUserConfirmation userId={value} onDeleteSuccess={handleDeleteSuccess} />
          </Space>
        );
      },
      width: 100,
    },
    {
      title: 'STT',
      dataIndex: 'Id',
      key: 'Id',
      align: 'center' as const,
      render: (_, __, index) => {
        const currentPage = props.searchParams?.pageIndex || 1;
        const pageSize = props.searchParams?.pageSize || 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
      width: 100,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'UserName',
      key: 'UserName',
      width: 200,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'FullName',
      key: 'FullName',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      width: 200,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
      width: 200,
    },
    {
      title: 'Vai trò',
      dataIndex: 'Id',
      key: 'Id',
      align: 'center' as const,
      render: (_, record) => {
        return <UpdateUserRolesModal user={record} />;
      },
      width: 100,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      width: 200,
      align: 'center' as const,
      render: (value) => {
        const date = dayjs(value);
        return date.isValid() ? date.format(DateTimeFormat.viDate) : '';
      },
    },
  ];

  if (userQuery.isError) {
    return <ErrorPage subTitle={userQuery.error.message} />;
  }

  return (
    <Table
      bordered
      {...tableProps}
      rowKey="Id"
      loading={userQuery.isPending}
      dataSource={userQuery.data?.data.Data}
      columns={columns}
      scroll={{ x: 1300 }}
      pagination={{
        hideOnSinglePage: true,
        total: userQuery.data?.data.TotalRecord,
        current: props?.searchParams?.pageIndex,
        pageSize: props.searchParams?.pageSize,
        ...props.pagination,
      }}
      locale={{
        emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" />,
      }}
    />
  );
};

export default UserList;
