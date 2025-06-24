import React, { useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const { Title } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profile", { replace: true });
    }
  }, []);

  const handleLogin = async (values) => {
    try {
      const res = await API.post("/api/login", values);
  
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        message.success("Login Successful");
        navigate("/profile", { replace: true });
      } else {
        const errorMsg = res?.data?.msg
        message.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Login failed. Please try again.";
      message.error(errorMsg);
    }
  };
  
  return (
    <div
      style={{
        maxWidth: 360,
        margin: "80px auto",
        padding: 24,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={3}>Sign in</Title>
      </div>

      <Form name="login" onFinish={handleLogin} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
