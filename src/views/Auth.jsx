import { GoogleCircleFilled } from '@ant-design/icons';
import {
  Button, Col, Divider, Row, Typography, Spin,
} from 'antd';
import {
  getAuth, GoogleAuthProvider,
  onAuthStateChanged, signInWithRedirect
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import NotAuthenticatedLayout from '../components/layouts/NotAuthenticatedLayout';
import Matchup from '../components/Matchup';
import '../styles/Auth.css';
import axios from '../utils/axios';
import firebaseApp from '../utils/firebase';

const { Text } = Typography;

function Auth() {
  const firebaseProvider = new GoogleAuthProvider();
  const firebaseAuth = getAuth(firebaseApp);

  const [loading, setLoading] = useState(true);

  let isAuthStateProcessed = false;
  
  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, async (user) => {
      if (isAuthStateProcessed) {
        return;
      }
      setLoading(true);
      isAuthStateProcessed = true;

      if (user === null) {
        setLoading(false);
        return;
      }

      try {
        const idToken = await user.getIdToken();
        await axios.post('/auth', {
          idToken,
        });
        window.location.reload();
      } catch (e) {
        setLoading(false);
      }
    });
  });

  async function onClickAuth() {
    signInWithRedirect(firebaseAuth, firebaseProvider);
  }

  const sampleData = [{
    home: ['Qatar', null, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_Qatar_%283-2%29.svg/1024px-Flag_of_Qatar_%283-2%29.svg.png'],
    away: ['Equador', null, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/510px-Flag_of_Ecuador.svg.png'],
    countdownMillis: null,
    startDate: new Date(),
  }, {
    home: ['Netherlands', null, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/510px-Flag_of_the_Netherlands.svg.png'],
    away: ['S.Arabia', null, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/510px-Flag_of_Saudi_Arabia.svg.png'],
    countdownMillis: new Date('2022-12-04T18:58').valueOf(),
    startDate: new Date('2022-11-24'),
  }, {
    home: ['XYZ', 6, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/510px-Flag_of_the_Netherlands.svg.png'],
    away: ['QWER', 7, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/510px-Flag_of_Saudi_Arabia.svg.png'],
    countdownMillis: null,
    startDate: new Date('2022-11-24'),
  }];

  return (
    <NotAuthenticatedLayout>
      <Divider orientation="left">
        <Text className="typ-title">Login</Text>
      </Divider>
      <Row wrap={false}>
        <Col>
          <Text>Create an account now by clicking the button below. If you already have a registered profile, do not worry, you will be authenticated automatically and start guessing!</Text>
        </Col>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <Col>
          <Spin spinning={loading}>
            <Button type="primary" size="large" danger block onClick={onClickAuth}>
              <GoogleCircleFilled></GoogleCircleFilled>
              <Text style={{ color: '#fff' }}>Click to login with Google</Text>
            </Button>
          </Spin>
        </Col>
      </Row>
      <Divider orientation="left" style={{ marginTop: 60 }}>
        <Text className="typ-title">Featured Matches</Text>
      </Divider>
      <Row gutter={[8, 8]} style={{ marginBottom: 60 }}>
        {
          sampleData.map(match => {
            return (
              <Col span={12}>
                <Matchup
                  home={match.home}
                  away={match.away}
                  countdownMillis={match.countdownMillis}
                  startDate={match.startDate}
                ></Matchup>
              </Col>
            )
          })
        }
      </Row>
    </NotAuthenticatedLayout>
  );
}

export default Auth;
