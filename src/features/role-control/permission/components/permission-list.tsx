import type { TableProps } from 'antd';
import { Empty, Space, Table } from 'antd';
import dayjs from 'dayjs';

import { ErrorPage } from '~/components/errors';
import { DateTimeFormat } from '~/constants/datetime-format';
import { useQueryParams } from '~/hooks/use-query-params';
import { usePermissionList } from '~/features/role-control/permission/hooks/queries/use-permission-list';
import type {
  Permission,
  PermissionSearchParams,
} from '~/features/role-control/permission/types/Permission';
import UpdatePermissionModal from '~/features/role-control/permission/components/update-permission-model';
import DeletePermissionConfirmation from '~/features/role-control/permission/components/delete-permission-confirmation';

const PermissionList = (
  props: TableProps<Permission> & { searchParams?: PermissionSearchParams }
) => {
  const { searchParams, ...tableProps } = props;
  const permissionQuery = usePermissionList(searchParams);

  const { queryParams, setQueryParams } = useQueryParams();

  const handleDeleteSuccess = () => {
    const currentPage = queryParams.page || 1;
    const pageSize = queryParams.pageSize || 10;

    const totalRecordsAfterDelete = (permissionQuery.data?.data?.TotalRecord ?? 1) - 1;
    const totalPagesAfterDelete = Math.ceil(totalRecordsAfterDelete / pageSize);

    const newPage =
      currentPage > totalPagesAfterDelete && currentPage > 1 ? currentPage - 1 : currentPage;
    setQueryParams({ page: newPage, pageSize });
  };

  const columns: TableProps<Permission>['columns'] = [
    {
      title: '-',
      dataIndex: 'Id',
      key: 'Id',
      align: 'center' as const,
      render: (value, record) => {
        return (
          <Space>
            <UpdatePermissionModal permission={record} />
            <DeletePermissionConfirmation
              permissionId={value}
              onDeleteSuccess={handleDeleteSuccess}
            />
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
      title: 'Mã quyền',
      dataIndex: 'PermissionCode',
      key: 'PermissionCode',
      width: 200,
    },
    {
      title: 'Tên quyền',
      dataIndex: 'PermissionName',
      key: 'PermissionName',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'Description',
      key: 'Description',
      width: 200,
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

  if (permissionQuery.isError) {
    return <ErrorPage subTitle={permissionQuery.error.message} />;
  }

  return (
    <Table
      bordered
      {...tableProps}
      rowKey="Id"
      loading={permissionQuery.isPending}
      dataSource={permissionQuery.data?.data.Data}
      columns={columns}
      scroll={{ x: 1000 }}
      pagination={{
        hideOnSinglePage: true,
        total: permissionQuery.data?.data.TotalRecord,
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

export default PermissionList;
