import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { Text } from '../text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater } from '@fortawesome/free-solid-svg-icons'; // Use a water icon for humidity
import axios from 'axios';

// Define the props type
interface HumidityProps {
  city: string;
}

const Humidity: React.FC<HumidityProps> = ({ city }) => {
  const [humidity, setHumidity] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = 'daf71691119ca4d47384cbd09dd37953'; 
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      axios.get(url)
        .then(response => {
          setHumidity(response.data.main.humidity);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div>
      <Card 
        style={{ height: '100%' }} 
        headStyle={{ padding: '8px 16px' }} 
        bodyStyle={{ padding: '0 1rem' }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={faWater} style={{ fontSize: '16px' }} /> 
            <Text size='sm' style={{ marginLeft: '0.7rem' }}>
              Humidity in {city}
            </Text>
          </div>
        }
      >
        <div style={{ padding: '1rem' }}>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {humidity !== null && <p>Current humidity: {humidity}%</p>}
        </div>
      </Card>
    </div>
  );
}

export default Humidity;
