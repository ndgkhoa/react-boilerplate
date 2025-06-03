import { App, Button, Flex, Form, Input } from 'antd';

import { ServiceMessage } from '~/utils/service-message';
import type {
  CreatePermissionBody,
  Permission,
} from '~/features/role-control/permission/types/Permission';
import { useCreatePermission } from '~/features/role-control/permission/hooks/mutations/use-create-permission';
import { useUpdatePermission } from '~/features/role-control/permission/hooks/mutations/use-update-permission';

interface Props {
  onCloseModal?: () => void;
  permission?: Permission;
}

interface FormValues extends CreatePermissionBody {}

const PermissionForm = (props: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const createMutation = useCreatePermission();
  const updateMutation = useUpdatePermission();

  const isEditSession = Boolean(props.permission?.Id);

  const createHandler = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess(response) {
        createMutation.invalidate();
        message.success(ServiceMessage.success(response).message);
        props?.onCloseModal?.();
      },
      onError(error) {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };
  const updateHandler = (values: FormValues) => {
    if (!props?.permission?.Id) return;

    updateMutation.mutate(
      {
        ...values,
        Id: props?.permission?.Id,
      },
      {
        onSuccess(response) {
          updateMutation.invalidate();
          message.success(ServiceMessage.success(response).message);
          props?.onCloseModal?.();
        },
        onError(error) {
          message.error(ServiceMessage.error(error).message);
        },
      }
    );
  };

  const loading = createMutation.isPending || updateMutation.isPending;

  return (
    <Form
      id="permission-form"
      disabled={loading}
      form={form}
      layout="vertical"
      onFinish={isEditSession ? updateHandler : createHandler}
      initialValues={{
        ...props?.permission,
      }}
    >
      <Form.Item<FormValues>
        name="PermissionCode"
        label="Mã quyền"
        rules={[
          { required: true, message: 'Trường này là bắt buộc' },
          { max: 25, message: 'Tối đa 25 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FormValues>
        name="PermissionName"
        label="Tên quyền"
        rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FormValues> name="Description" label="Mô tả">
        <Input.TextArea rows={6} />
      </Form.Item>

      <Flex gap="middle" align="center" justify="end">
        <Button onClick={props.onCloseModal}>Hủy bỏ</Button>
        <Button loading={loading} htmlType="submit" type="primary">
          Xác nhận
        </Button>
      </Flex>
    </Form>
  );
};

export default PermissionForm;
