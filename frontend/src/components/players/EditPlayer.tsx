import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

const EditPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/footinsights/${id}`)
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

  const handleSubmit = (values: any) => {
    axios.put(`http://localhost:8000/api/footinsights/${id}/update`, values)
      .then(() => {
        message.success('Player updated successfully.');
        navigate('/players');
      })
      .catch(() => {
        setError('Error updating player.');
        message.error('Error updating player.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Form initialValues={player} onFinish={handleSubmit}>
      <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Best_Position" label="Position" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Status" label="Status" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  );
};

export default EditPlayer;
