import {
  Avatar,
  Button, Col, Row, Statistic, Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import '../styles/Matchup.css';

const { Text } = Typography;
const { Countdown } = Statistic;

function Matchup(props) {
  const [homeName, homeScore, homeFlag] = props.home || ["", null, null]
  const [awayName, awayScore, awayFlag] = props.away || ["", null, null]
  const { countdownMillis, startDate } = props;

  const [hasScore, setHasScore] = useState(homeScore !== null && awayScore !== null);
  const [isGuessEnabled, setIsGuessEnabled] = useState(!hasScore && !countdownMillis);

  useEffect(() => {
    setHasScore(homeScore !== null && awayScore !== null);
  }, [homeScore, awayScore])

  function scoreNode(score) {
    if (score === null) {
      return '';
    }
    return <Text className="typ-bold typ-24">{ score }</Text>;
  }

  function onFinishCountdown() {
    console.log('cdwn finished!');
    setIsGuessEnabled(!hasScore);
  }

  function guessContent() {
    if (!isGuessEnabled) {
      if (hasScore) {
        return '';
      }

      return (
        <Countdown
          title="Guess after:"
          value={countdownMillis}
          valueStyle={{ fontSize: 10, textAlign: 'right' }}
          onFinish={onFinishCountdown}
        />
      );
    }

    return (
      <Col offset={1}>
        <Row justify="center">
          <Col>
            <Text>{ dayjs(startDate).format("DD MMM HH:mm") }</Text>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Button type="primary" size="large">
              Guess
            </Button>
          </Col>
        </Row>
      </Col>
    );
  }

  const teamNameRowStyles = !hasScore ? { marginRight: 32 } : {};

  return (
    <Row align="middle" wrap={false} className="matchup">
      <Col flex={1}>

        <Row align="center" style={{ ...teamNameRowStyles }}>
          <Col flex={1}>
            <Row wrap={false} align="center">
              <Col>
                <Avatar
                  size={40}
                  alt={homeName}
                  shape="square"
                  src={homeFlag}
                ></Avatar>
              </Col>
              <Col flex={1} offset={1}>
                <Text className="typ-bold typ-24">{ homeName }</Text>
              </Col>
              <Col offset={1}>
                { scoreNode(homeScore) }
              </Col>
            </Row>
          </Col>
        </Row>

        <Row align="center" style={{ marginTop: 8, ...teamNameRowStyles }}>
          <Col flex={1}>
            <Row wrap={false} align="center">
              <Col>
                <Avatar
                  size={40}
                  alt={awayName}
                  shape="square"
                  src={awayFlag}
                ></Avatar>
              </Col>
              <Col flex={1} offset={1}>
                <Text className="typ-bold typ-24">{ awayName }</Text>
              </Col>
              <Col offset={1}>
                { scoreNode(awayScore) }
              </Col>
            </Row>
          </Col>
        </Row>

      </Col>
      
      { guessContent() }
    </Row>
  );
}

export default Matchup;
