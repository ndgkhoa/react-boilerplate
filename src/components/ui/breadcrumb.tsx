import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const specialSegments = [{ name: 'admin', icon: <SafetyCertificateOutlined /> }];

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <AntBreadcrumb style={{ margin: '16px 0' }}>
      <AntBreadcrumb.Item>
        <Link to="/">
          <HomeOutlined />
        </Link>
      </AntBreadcrumb.Item>

      {pathnames.map((value, index) => {
        let to = `/${pathnames.slice(0, index + 1).join('/')}`;

        const special = specialSegments.find((s) => s.name === value);
        if (special) {
          to = '/';
        }

        const label = special ? special.icon : value;

        return (
          <AntBreadcrumb.Item key={to}>
            {index === pathnames.length - 1 ? label : <Link to={to}>{label}</Link>}
          </AntBreadcrumb.Item>
        );
      })}
    </AntBreadcrumb>
  );
};
