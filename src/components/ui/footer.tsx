import { Layout } from 'antd';

export const Footer = () => {
  return (
    <Layout.Footer className="text-center">
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Layout.Footer>
  );
};
