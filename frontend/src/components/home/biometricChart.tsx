import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, List } from 'antd';
import { Column } from '@ant-design/plots';
import { Text } from '../text';

enum Status {
  Pause = 'Pause',
  Fatigue = 'Fatigue',
  Dehydration = 'Dehydration',
  RiskOfInjury = 'Risk of injury',
  Normal = 'Normal',
  HighPerformance = 'High Performance',
}

function BiometricChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/footinsights/')
      .then(response => {
        const processedData = response.data.map((item: any) => ({
          ...item,
          Status: Status[item.Status] 
        }));
        setData(processedData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const config = {
    data: data,
    xField: 'Name',
    yField: 'Status',
    seriesField: 'Status',
    height: 325,
    color: (item: { Status: string }) => {
      switch (item.Status) {
        case Status.Pause:
          return '#f5222d';
        case Status.Fatigue:
          return '#faad14';
        case Status.Dehydration:
          return '#1890ff';
        case Status.RiskOfInjury:
          return '#722ed1';
        case Status.Normal:
          return '#52c41a';
        case Status.HighPerformance:
          return '#13c2c2';
        default:
          return '#52c41a'
      }
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      showTitle: true,
      shared: true,
      showMarkers: false,
      customContent: (title: string, items: any[]) => {
        return items.map(item => 
          `<div style="color:${item.color}">${item.data.Name}: ${item.data.Status}</div>`
        ).join('');
      },
    },
    xAxis: {
      title: {
        text: 'Players',
      },
      label: {
        autoRotate: false,
      },
    },
    yAxis: {
      title: {
        text: 'Status',
      },
      label: {
        autoRotate: false,
      },
    },
  };
  
  return (
    <Card
      style={{ height: "100%" }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{ padding: "0 1rem" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            Biometric Data
          </Text>
        </div>
      }
    >
      <Column {...config} />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.Name}
              description={`Status: ${item.Status}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default BiometricChart;
