import { App, Button, Flex, Form, Input } from 'antd';

import { ServiceMessage } from '~/utils/service-message';
import type { CreateRoleBody, Role } from '~/features/role-control/role/types/Role';
import { useCreateRole } from '~/features/role-control/role/hooks/mutations/use-create-role';
import { useUpdateRole } from '~/features/role-control/role/hooks/mutations/use-update-role';

interface Props {
  onCloseModal?: () => void;
  role?: Role;
}

interface FormValues extends CreateRoleBody {}

const RoleForm = (props: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  const isEditSession = Boolean(props.role?.Id);

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
    if (!props?.role?.Id) return;

    updateMutation.mutate(
      {
        ...values,
        Id: props?.role?.Id,
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
      id="role-form"
      disabled={loading}
      form={form}
      layout="vertical"
      onFinish={isEditSession ? updateHandler : createHandler}
      initialValues={{
        ...props?.role,
      }}
    >
      <Form.Item<FormValues>
        name="RoleName"
        label="Tên vai trò"
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

export default RoleForm;
