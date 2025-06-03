import { App, Button, Flex, Form, Input } from 'antd';

import { ServiceMessage } from '~/utils/service-message';
import { Regexes } from '~/constants/regexes';
import { UserAvatar } from '~/features/role-control/user/components/user-avatar';
import type { CreateUserBody, User } from '~/features/role-control/user/types/User';
import { useCreateUser } from '~/features/role-control/user/hooks/mutations/use-create-user';
import { useUpdateUser } from '~/features/role-control/user/hooks/mutations/use-update-user';

interface Props {
  onCloseModal?: () => void;
  user?: User;
}

interface FormValues extends CreateUserBody {}

const UserForm = (props: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const isEditSession = Boolean(props.user?.Id);

  const createHandler = (values: FormValues) => {
    const formData = new FormData();
    formData.append('Avatar', values.Avatar);
    formData.append('UserName', values.UserName);
    formData.append('Email', values.Email);
    formData.append('FullName', values.FullName);
    formData.append('PhoneNumber', values.PhoneNumber);

    createMutation.mutate(formData, {
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
    if (!props?.user?.Id) return;
    const formData = new FormData();
    formData.append('Avatar', values.Avatar);
    formData.append('UserName', values.UserName);
    formData.append('Email', values.Email);
    formData.append('FullName', values.FullName);
    formData.append('PhoneNumber', values.PhoneNumber);
    updateMutation.mutate(
      {
        Id: props?.user?.Id,
        formData,
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
      id="user-form"
      disabled={loading}
      form={form}
      layout="vertical"
      onFinish={isEditSession ? updateHandler : createHandler}
      initialValues={{
        ...props?.user,
      }}
    >
      <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        <Form.Item
          name="Avatar"
          className="grid place-items-center md:col-span-2 xl:col-span-1 xl:row-span-3"
        >
          <UserAvatar src={props.user?.Avatar} />
        </Form.Item>
        <Form.Item<FormValues>
          name="UserName"
          label="Tên đăng nhập"
          rules={[
            { required: true, message: 'Trường này là bắt buộc' },
            { pattern: Regexes.username, message: '3-20 ký tự, không dấu cách' },
          ]}
        >
          <Input placeholder="UserName" />
        </Form.Item>
        <Form.Item<FormValues>
          name="Email"
          label="Email"
          rules={[
            { required: true, message: 'Trường này là bắt buộc' },
            { type: 'email', message: 'Trường này phải là email' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item<FormValues>
          name="FullName"
          label="Họ và tên"
          rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
        >
          <Input placeholder="FullName" />
        </Form.Item>
        <Form.Item<FormValues>
          name="PhoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Trường này là bắt buộc' },
            { pattern: Regexes.phone, message: 'Trường này phải là số điện thoại' },
          ]}
        >
          <Input placeholder="PhoneNumber" />
        </Form.Item>
      </div>

      <Flex gap="middle" align="center" justify="end">
        <Button onClick={props.onCloseModal}>Hủy bỏ</Button>
        <Button loading={loading} htmlType="submit" type="primary">
          Xác nhận
        </Button>
      </Flex>
    </Form>
  );
};

export default UserForm;
