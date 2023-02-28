import React from 'react';
import { Table, Avatar, Row, Col, Typography } from 'antd';

const { Text } = Typography;

function LadderTable({ data }) {

  const typClassNames = [
    '',
    'typ-bold typ-24',
    'typ-bold typ-20',
    'typ-bold typ-16',
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'order',
      key: 'order',
      render: (_, { order }) => {
        return (
          <>
            <Text
              className={typClassNames[order] || ''}
            >
              { order }
            </Text>
          </>
        )
      },
    },
    {
      title: '',
      dataIndex: 'user',
      key: 'user',
      render: (_, { order, user }) => {
        return (
          <>
            <Row align="middle">
              <Col>
                <Avatar></Avatar>
              </Col>
              <Col flex={1} offset={1}>
                <Text
                  className={typClassNames[order] || ''}
                >
                  { user.displayName }
                </Text>
              </Col>            
            </Row>
          </>
        );
      },
    },
    {
      title: 'Pts',
      dataIndex: 'points',
      key: 'points',
      align: 'center',
      render: (_, { order, points }) => {
        return (
          <>
            <Text className={typClassNames[order] || ''}>
              { points }
            </Text>
          </>
        );
      },
    },
  ];

  return (
    <Table columns={columns} dataSource={data}></Table>
  );
}

export default LadderTable;
