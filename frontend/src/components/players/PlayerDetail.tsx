import React, { useState, useEffect } from "react";
import { Table, Avatar, Input, Button, Modal, Form, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
const initialPlayerDetails = {
  Name: "",
  photoUrl: "",
  Best_Position: "",
  Age: "",
  Stamina: "",
  Strength: "",
  Height: "",
  Weight: "",
  Agility: "",
  Acceleration: "",
  Sprint_Speed: "",
  Nationality: "",
  Club: "",
  Cardiac_Frequency: "",
  Humidity: "",
  Temperature: "",
  Status: "",
  status_encoded: "",
};

function Player() {
  const [players, setPlayers] = useState([]);
  const [newName, setNewName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [playerDetails, setPlayerDetails] = useState({ ...initialPlayerDetails });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/footinsights/");
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePlayer = async (pk: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/footinsights/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerDetails),
      });
      if (response.ok) {
        message.success("Player updated successfully!");
        fetchPlayers();
      } else {
        message.error("Failed to update player");
      }
    } catch (err) {
      console.log(err);
      message.error("Failed to update player");
    }
  };

  const deletePlayer = async (pk: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/footinsights/${pk}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Player deleted successfully!");
        fetchPlayers();
      } else {
        message.error("Failed to delete player");
      }
    } catch (err) {
      console.log(err);
      message.error("Failed to delete player");
    }
  };

  const addPlayer = async () => {
    // Check for required fields
    if (!playerDetails.Name || !playerDetails.photoUrl || !playerDetails.Best_Position) {
      message.error("Please fill in all required fields.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/footinsights/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerDetails),
      });
  
      const result = await response.json();
      if (response.ok) {
        message.success("Player added successfully!");
        fetchPlayers();
        setIsAddModalVisible(false);
      } else {
        message.error("Failed to add player");
        console.log(result);  // Log the response to understand the issue
      }
    } catch (err) {
      console.log(err);
      message.error("Failed to add player");
    }
  };
  

  const showModal = (player: any) => {
    setPlayerDetails(player);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    updatePlayer(playerDetails._id);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showAddModal = () => {
    setPlayerDetails({ ...initialPlayerDetails }); // Reset form fields
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const columns = [
    {
      title: "Player",
      dataIndex: "Name",
      key: "Name",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.photoUrl} />
          <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
      ),
    },
    {
      title: "Position",
      dataIndex: "Best_Position",
      key: "Best_Position",
    },
    {
      title: "Age",
      dataIndex: "Age",
      key: "Age",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Club",
      dataIndex: "Club",
      key: "Club",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{ marginLeft: 8, cursor: "pointer", backgroundColor: "#1890ff" }}
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Avatar
            style={{ marginLeft: 8, cursor: "pointer", backgroundColor: "#ff4d4f" }}
            icon={<DeleteOutlined />}
            onClick={() => deletePlayer(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
       <h2 style={{ fontSize: '24px', color: 'black', fontWeight: 'bold' }}>
          Your Players
        </h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddModal}
        style={{ marginBottom: 16 }}
      >
        Add New Player
      </Button>
      <Table dataSource={players} columns={columns} rowKey="_id" />

      {/* Edit Player Modal */}
      <Modal
        title="Edit Player"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Player Name">
            <Input
              name="Name"
              value={playerDetails.Name}
              onChange={(e) => setPlayerDetails({ ...playerDetails, Name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Photo URL">
            <Input
              name="photoUrl"
              value={playerDetails.photoUrl}
              onChange={(e) => setPlayerDetails({ ...playerDetails, photoUrl: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Best Position">
            <Input
              name="Best_Position"
              value={playerDetails.Best_Position}
              onChange={(e) =>
                setPlayerDetails({ ...playerDetails, Best_Position: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Age">
            <Input
              name="Age"
              value={playerDetails.Age}
              onChange={(e) => setPlayerDetails({ ...playerDetails, Age: e.target.value })}
            />
          </Form.Item>
          {/* Add additional fields as needed */}
        </Form>
      </Modal>

      {/* Add New Player Modal */}
      <Modal
        title="Add New Player"
        visible={isAddModalVisible}
        onOk={addPlayer}
        onCancel={handleAddCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Player Name">
            <Input
              name="Name"
              value={playerDetails.Name}
              onChange={(e) => setPlayerDetails({ ...playerDetails, Name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Photo URL">
            <Input
              name="photoUrl"
              value={playerDetails.photoUrl}
              onChange={(e) => setPlayerDetails({ ...playerDetails, photoUrl: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Best Position">
            <Input
              name="Best_Position"
              value={playerDetails.Best_Position}
              onChange={(e) =>
                setPlayerDetails({ ...playerDetails, Best_Position: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Age">
            <Input
              name="Age"
              value={playerDetails.Age}
              onChange={(e) => setPlayerDetails({ ...playerDetails, Age: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="Status"
            label="Status"
            rules={[{ required: true, message: 'Please enter the status!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Stamina"
            label="Stamina"
            rules={[{ required: true, message: 'Please enter the stamina!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Strength"
            label="Strength"
            rules={[{ required: true, message: 'Please enter the strength!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Height"
            label="Height (cm)"
            rules={[{ required: true, message: 'Please enter the height!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Weight"
            label="Weight (kg)"
            rules={[{ required: true, message: 'Please enter the weight!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Agility"
            label="Agility"
            rules={[{ required: true, message: 'Please enter the agility!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Acceleration"
            label="Acceleration"
            rules={[{ required: true, message: 'Please enter the acceleration!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Sprint_Speed"
            label="Sprint Speed"
            rules={[{ required: true, message: 'Please enter the sprint speed!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Nationality"
            label="Nationality"
            rules={[{ required: true, message: 'Please enter the nationality!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Club"
            label="Club"
            rules={[{ required: true, message: 'Please enter the club!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Cardiac_Frequency"
            label="Cardiac Frequency"
            rules={[{ required: true, message: 'Please enter the cardiac frequency!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Humidity"
            label="Humidity (%)"
            rules={[{ required: true, message: 'Please enter the humidity!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Temperature"
            label="Temperature (°C)"
            rules={[{ required: true, message: 'Please enter the temperature!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="status_encoded"
            label="Status Encoded"
            rules={[{ required: true, message: 'Please enter the status encoded!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Player;
