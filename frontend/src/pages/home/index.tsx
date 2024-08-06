import React from 'react';
import Humidity from "@/components/home/humidity";
import Temperature from "@/components/home/temperature";
import BiometricChart from "@/components/home/biometricChart";
import { Row, Col } from "antd";

export const Home = () => {
  const city = "Casablanca";

  return (
    <div style={{ padding: '1px' }}>
      <div style={{ marginBottom: '16px', marginLeft: '0px' }}>
        <h2 style={{ fontSize: '24px', color: 'black', fontWeight: 'bold' }}>
          Welcome Back, Coach 👋
        </h2>
      </div>
      <Row gutter={[32, 32]} style={{ marginBottom: 0 }}>
        <Col xs={24} sm={12} xl={8} style={{ height: "160px" }}>
          <Temperature city={city} />
        </Col>
        <Col xs={24} sm={12} xl={8} style={{ height: "160px" }}>
          <Humidity city={city} />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: 0 }}>
        <Col span={24}>
          <BiometricChart />
        </Col>
      </Row>
    </div>
  );
};
