import React from "react";
import { Layout, Menu, Button, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1]; 

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; 
    } else {
      navigate(`/${e.key}`);
    }
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "0 24px",
        boxShadow: "0 2px 8px #f0f1f2",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Title level={4} style={{ margin: 0 }}>
        Dashboard
      </Title>
      <Menu
        mode="horizontal"
        selectedKeys={[currentPath]} 
        onClick={handleMenuClick}
      >
        <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.Item key="topics">Topics</Menu.Item>
        <Menu.Item key="progress">Progress</Menu.Item>
        <Menu.Item key="logout">
          <Button type="primary" danger size="small">
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
