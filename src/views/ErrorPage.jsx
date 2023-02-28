import React from 'react';
import { useRouteError } from "react-router-dom";
import { Typography } from 'antd';

const { Text } = Typography;

function NotFoundPage() {
  const error = useRouteError();

  return (
    <Text>{ error.statusText || error.message }</Text>
  );
}

export default NotFoundPage;
