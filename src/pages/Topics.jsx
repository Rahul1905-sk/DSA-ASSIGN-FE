import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Collapse,
  Table,
  Checkbox,
  Tag,
  Row,
  Col,
  Spin,
  Button,
  message,
  Space,
} from "antd";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const { Content, Footer } = Layout;
const { Title, Text, Link } = Typography;
const { Panel } = Collapse;

const getStatusTag = (checked) => (
  <Tag color={checked ? "green" : "red"}>{checked ? "Done" : "Pending"}</Tag>
);

const getLevelTag = (level) => {
  const color = {
    Easy: "green",
    Medium: "orange",
    Hard: "red",
  }[level];
  return <Tag color={color}>{level}</Tag>;
};

export default function Topics() {
  const [chapters, setChapters] = useState([]);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const { data } = await API.get("/api/chapters");

      const transformed = data.map((chapter) => ({
        _id: chapter._id,
        title: chapter.name,
        topics: chapter.topics.map((topic) => ({
          ...topic,
          title: topic.name,
          completed: topic.status,
          resources: [
            { type: "leetcode", url: topic.leetcode_link },
            { type: "youtube", url: topic.youtube_link },
            { type: "article", url: topic.article_link },
          ],
        })),
      }));

      setChapters(transformed);
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
      message.error("Unable to load topics.");
    }
  };

  const toggleTopic = async (chapterId, topicId, newStatus) => {
    try {
      await API.patch(`/api/chapters/${chapterId}/topics/${topicId}/status`, {
        status: newStatus,
      });

      await fetchChapters();
    } catch (err) {
      console.error("Failed to update topic:", err);
      message.error("Failed to update topic status.");
    }
  };

  const handleReset = async () => {
    try {
      setResetting(true);
      await API.post("/api/chapters/topics/reset");
      message.success("All topics reset to pending.");
      await fetchChapters();
    } catch (err) {
      console.error(err);
      message.error("Error resetting topics.");
    } finally {
      setResetting(false);
    }
  };

  const totalTopics = chapters.reduce((sum, ch) => sum + ch.topics.length, 0);
  const completedTopics = chapters.reduce(
    (sum, ch) => sum + ch.topics.filter((t) => t.completed).length,
    0
  );


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: "40px 24px", backgroundColor: "#f0f2f5" }}>
        <Row justify="center">
          <Col span={24} style={{ textAlign: "center", marginBottom: 24 }}>
            <Title level={2}>Topics</Title>
            <Text type="secondary">Explore these exciting topics!</Text>
            <br />
            <Text strong style={{ color: "#52c41a", fontSize: 16 }}>
              ✅ {completedTopics} of {totalTopics} subtopics completed
            </Text>
          </Col>
        </Row>
        <Row>
          <Col  style={{marginLeft:'auto', marginBottom:'10px' }}>
            <Button type="primary" danger onClick={handleReset} loading={resetting}>
              Reset All
            </Button>
          </Col>
        </Row>

        <Collapse
          accordion
          bordered={false}
          expandIconPosition="end"
          style={{ backgroundColor: "transparent" }}
        >
          {chapters.map((chapter) => (
            <Panel
              key={chapter._id}
              header={
                <Row justify="space-between" align="middle" style={{ width: "100%" }}>
                  <Col>
                    <Text strong style={{ color: "#fff" }}>{chapter.title}</Text>
                  </Col>
                  <Col>
                    <Tag
                      color={chapter.topics.every((t) => t.completed) ? "green" : "red"}
                      style={{ fontSize: "12px" }}
                    >
                      {chapter.topics.every((t) => t.completed) ? "Done" : "Pending"}
                    </Tag>
                  </Col>
                </Row>
              }
              style={{
                backgroundColor: "#00C0F0",
                borderRadius: 6,
                marginBottom: 16,
              }}
            >
              <Table
                dataSource={chapter.topics}
                columns={[
                  {
                    title: "",
                    render: (_, topic) => (
                      <Checkbox
                        checked={topic.completed}
                        onChange={() =>
                          toggleTopic(chapter._id, topic._id, !topic.completed)
                        }
                      />
                    ),
                  },
                  { title: "Name", dataIndex: "title" },
                  {
                    title: "LeetCode",
                    render: (_, topic) =>
                      topic.resources.find((r) => r.type === "leetcode")?.url ? (
                        <Link
                          href={topic.resources.find((r) => r.type === "leetcode").url}
                          target="_blank"
                        >
                          Practice
                        </Link>
                      ) : (
                        "N/A"
                      ),
                  },
                  {
                    title: "YouTube",
                    render: (_, topic) =>
                      topic.resources.find((r) => r.type === "youtube")?.url ? (
                        <Link
                          href={topic.resources.find((r) => r.type === "youtube").url}
                          target="_blank"
                        >
                          Watch
                        </Link>
                      ) : (
                        "N/A"
                      ),
                  },
                  {
                    title: "Article",
                    render: (_, topic) =>
                      topic.resources.find((r) => r.type === "article")?.url ? (
                        <Link
                          href={topic.resources.find((r) => r.type === "article").url}
                          target="_blank"
                        >
                          Read
                        </Link>
                      ) : (
                        "N/A"
                      ),
                  },
                  {
                    title: "Level",
                    dataIndex: "level",
                    render: getLevelTag,
                  },
                  {
                    title: "Status",
                    render: (_, topic) => getStatusTag(topic.completed),
                  },
                ]}
                pagination={false}
                rowKey={(topic) => topic._id}
                bordered
                scroll={{ x: true }}
              />
            </Panel>
          ))}
        </Collapse>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2025 Dashboard App. All rights reserved.
      </Footer>
    </Layout>
  );
}
