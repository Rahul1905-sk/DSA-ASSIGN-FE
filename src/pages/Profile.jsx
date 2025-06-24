import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, Avatar, Row, Col } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Profile() {

  const [user, setUser] = useState({username:'', email:''})

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])
  

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />

      <Content style={{ padding: "40px 24px", backgroundColor: "#f0f2f5" }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={14} lg={10}>
            <Card
              bordered={false}
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Avatar
                size={80}
                icon={<UserOutlined />}
                style={{ marginBottom: 20 }}
              />
              <Title level={3}>Welcome back, {user.username} 👋</Title>
              <Text type="secondary">
                <MailOutlined style={{ marginRight: 8 }} />
                {user.email}
              </Text>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        ©2025 Dashboard App. All rights reserved.
      </Footer>
    </Layout>
  );
}
