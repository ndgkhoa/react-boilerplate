import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const FullscreenFallback = () => {
  return <Spin spinning fullscreen indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />;
};
