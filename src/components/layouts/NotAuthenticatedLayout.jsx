import '../../styles/NotAuthenticatedLayout.css';
import logoUrl from '../../img/logo-light.png';
import React from 'react';
import {
  Row,
  Col,
  Typography,
  Layout,
} from 'antd';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

function SiteLayout({ children }) {
  return (
    <Layout>
      <Layout className="no-auth-site-layout">
        <Header className="site-header" style={{ padding: 0 }}>
          <Row wrap={false} align="center">
            <Col>
              <div id="logo" style={{ backgroundImage: `url(${logoUrl})` }}></div>
            </Col>
            <Col>
              <Text className="typ-title"></Text>
            </Col>
          </Row>
        </Header>
        <Content className="site-content">
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
