import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Avatar, Typography } from 'antd';

const { Title, Text } = Typography;

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/footinsights/players/:id`)
      .then(response => {
        setPlayer(response.data);
      })
      .catch(() => {
        setError('Error loading player details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text type="danger">{error}</Text>;

  return (
    <Card>
      <Avatar src={player.photoUrl} size={100} />
      <Title level={2}>{player.Name}</Title>
      <Text>Position: {player.Best_Position}</Text><br />
      <Text>Status: {player.Status}</Text>
    </Card>
  );
};

export default PlayerDetail;
