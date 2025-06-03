import type { PopconfirmProps } from 'antd';
import { Popconfirm as AntPopconfirm } from 'antd';
import { memo } from 'react';

export const Popconfirm = memo((props: PopconfirmProps) => {
  const popconfirmProps: PopconfirmProps = {
    destroyOnHidden: true,
    cancelText: 'Hủy',
    okText: 'Xác nhận',
    ...props,
  };

  return <AntPopconfirm {...popconfirmProps} />;
});
