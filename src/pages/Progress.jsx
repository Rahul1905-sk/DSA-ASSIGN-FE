import React, { useEffect, useState } from "react";
import { Layout, Typography, Progress, Space, Spin, Row, Col, message } from "antd";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function ProgressPage() {
  const [completion, setCompletion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/api/chapters");

      const stats = {
        Easy: { total: 0, completed: 0 },
        Medium: { total: 0, completed: 0 },
        Hard: { total: 0, completed: 0 },
      };

      data.forEach((chapter) => {
        chapter.topics.forEach((topic) => {
          const level = topic.level;
          if (stats[level]) {
            stats[level].total += 1;
            if (topic.status) stats[level].completed += 1;
          }
        });
      });

      const computed = Object.entries(stats).reduce((acc, [level, { total, completed }]) => {
        acc[level] = {
          percent: total ? (completed / total) * 100 : 0,
          total,
          completed,
        };
        return acc;
      }, {});

      setCompletion(computed);
    } catch (err) {
      console.error("Failed to fetch progress:", err);
      message.error("Unable to load progress data.");
    } finally {
      setLoading(false);
    }
  };

  const colorMap = {
    Easy: "#52c41a",
    Medium: "#faad14",
    Hard: "#f5222d",
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: "24px" }}>
        <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
          <Title level={4}>Your Progress by Difficulty</Title>

          {loading ? (
            <Row justify="center" align="middle" style={{ minHeight: "200px" }}>
              <Spin size="large" />
            </Row>
          ) : (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {Object.entries(completion).map(([level, { percent, total, completed }]) => (
                <div key={level}>
                  <Text strong>
                    {level}: {completed} / {total} completed ({percent.toFixed(2)}%)
                  </Text>
                  <Progress
                    percent={parseFloat(percent.toFixed(2))}
                    strokeColor={colorMap[level]}
                    status="active"
                  />
                </div>
              ))}
            </Space>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2025 Dashboard App. All rights reserved.
      </Footer>
    </Layout>
  );
}
