import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const specialSegments = [{ name: 'admin', icon: <SafetyCertificateOutlined /> }];

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  const items = [
    {
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathnames.map((value, index) => {
      let to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const special = specialSegments.find((s) => s.name === value);
      if (special) {
        to = '/';
      }

      const label = special ? special.icon : value;

      return {
        title: index === pathnames.length - 1 ? label : <Link to={to}>{label}</Link>,
      };
    }),
  ];

  return <AntBreadcrumb style={{ margin: '16px 0' }} items={items} />;
};
