import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Avatar, Typography, Popconfirm, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {getplayer} from '../services/ApiService';
const { Text } = Typography;
// https://www.youtube.com/watch?v=RvOUBQdVLnY
interface Player {
  id: string;
  Name: string;
  Best_Position: string;
  Status: string;
  photoUrl: string;
  Nationality: string; // Add Nationality to the Player interface
}

const PlayerTable: React.FC = () => {
  const [data, setData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getplayer()
    .catch(() => {
        setError('Error loading players.');
      })
    .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (record: Player) => {
    navigate(`/players/edit/${record.id}`);
  };

  const handleView = (record: Player) => {
    navigate(`/players/${record.id}`);
  };

  const handleDelete = (record: Player) => {
    axios.delete(`http://localhost:8000/api/footinsights/${record.id}`)
      .then(() => {
        setData(prevData => prevData.filter(player => player.id !== record.id));
        message.success('Player deleted successfully.');
      })
      .catch(() => {
        setError('Error deleting player.');
        message.error('Error deleting player.');
      });
  };

  const columns: ColumnsType<Player> = [
    {
      title: 'Player',
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      render: (photoUrl: string, record: Player) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={photoUrl} size={50} style={{ marginRight: 10 }} />
          {record.Name}
        </div>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'Best_Position',
      key: 'Best_Position',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Player) => (
        <div>
          <Button 
            type="link" 
            icon={<EyeOutlined />} 
            onClick={() => handleView(record)} 
            style={{ marginRight: 8 }}
          />
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure you want to delete this player?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              style={{ color: 'red' }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (loading) return <Text>Loading players...</Text>;
  if (error) return <Text type="danger">{error}</Text>;

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
    />
  );
};

export default PlayerTable;
