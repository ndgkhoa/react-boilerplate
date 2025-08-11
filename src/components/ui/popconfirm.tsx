import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { PopconfirmProps } from 'antd';
import { Popconfirm as AntPopconfirm } from 'antd';

export const Popconfirm = memo((props: PopconfirmProps) => {
  const { t } = useTranslation();

  const popconfirmProps: PopconfirmProps = {
    destroyOnHidden: true,
    cancelText: t('Common.Cancel'),
    okText: t('Common.Confirm'),
    ...props,
  };

  return <AntPopconfirm {...popconfirmProps} />;
});
