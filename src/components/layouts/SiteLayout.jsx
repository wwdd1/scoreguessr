import '../../styles/SiteLayout.css';
import logoUrl from '../../img/logo-light.png';
import qatar22Banner from '../../img/qatar-22-banner.jpeg';
import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import {
  Avatar,
  Row,
  Col,
  Typography,
  Space,
  Layout,
  Menu,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeFilled,
  ProfileFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

function SiteLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState('1');
  const [pageTitle, setPageTitle] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const { user } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '1',
      icon: <HomeFilled />,
      label: 'Predictions',
      route: '/v/predictions',
    },
    {
      key: '2',
      icon: <ProfileFilled />,
      label: 'Leaderboard',
      route: '/v/leaderboard',
    },
    {
      key: '(separator)',
      label: '',
    },
    {
      key: 'logout',
      danger: true,
      icon: <LogoutOutlined />,
      label: 'Logout',
      route: null,
    }
  ];

  useEffect(() => {
    const { pathname } = location;
    let menuItem = menuItems.find(
      (t) => t.route === pathname
    );
    if (!menuItem) {
      return navigate(menuItems[0].route);
    }
    setActiveMenuKey(menuItem.key);
    setPageTitle(menuItem.label);
  }, [location]);

  useEffect(() => {
    const names = user.name.split(' ');
    setName(names.slice(0, names.length - 1).join(' '));
    setLastName(names[names.length - 1]);
    setProfilePicture(user.profilePicture);
  }, [user]);

  async function onClickSiderMenuItem(e) {
    setCollapsed(true);
    const item = menuItems.find(item => item.key === e.key);
    if (item.key === 'logout') {
      await axios.post('/user/logout');
      navigate('/auth');
      return;
    }
    if (item.route) {
      navigate(item.route);
    }
  }

  return (
    <Layout>
      <Sider
        theme="dark"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div id="logo" style={{ backgroundImage: `url(${logoUrl})` }}></div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeMenuKey]}
          items={menuItems}
          onClick={onClickSiderMenuItem}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-header" style={{ padding: 0 }}>
          <Row wrap={false}>
            <Col>
              {
                React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })
              }
            </Col>
            <Col flex={1}>
              <Text className="typ-title-i">{ pageTitle }</Text>
            </Col>
            <Col>
              <Row align="center">
                <Space style={{ marginRight: 16 }}>
                  <div>
                    <div style={{ lineHeight: 1 }}>{ name }</div>
                    <div className="typ-caption" style={{ lineHeight: 1, textAlign: 'right' }}>{ lastName }</div>
                  </div>
                  <Avatar src={profilePicture}></Avatar>
                </Space>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content className="site-content">
          <Row
            className="qatar-22-banner"
            style={{
              backgroundImage: `url(${qatar22Banner})`,
              backgroundSize: 'cover',
            }}
            align="middle"
          >
            <Col>
              <Text className="typ-title typ-thin" style={{ color: 'white', marginLeft: 8 }}>
                World Cup 2022 - Qatar
              </Text>
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              { children }
            </Col>
          </Row>
        </Content>
        <Footer>
          <Row>
            <Col flex={1}>
              <Text>Score Guessr - 2022</Text>
            </Col>
            <Col>
              <Text>support@scoreguessr.com</Text>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default SiteLayout;
