"use client";

import { Avatar, Form, Button, List, Input, Typography, Card } from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Text } = Typography;

export default function CommentBox() {
  const [comments, setComments] = useState<
    { author: string; content: string; avatar: string; datetime: string }[]
  >([]);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    const newComment = {
      author: "کاربر ناشناس",
      content: value,
      avatar: "/user.png",
      datetime: new Date().toLocaleString(),
    };
    setComments([newComment, ...comments]);
    setValue("");
  };

  return (
    <div className="mt-6">
      {/* فرم ثبت کامنت */}
      <Form.Item>
        <TextArea
          rows={3}
          placeholder="نظر خود را بنویسید..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          ثبت نظر
        </Button>
      </Form.Item>

      {/* لیست کامنت‌ها */}
      <List
        dataSource={comments}
        header={`${comments.length} نظر`}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item>
            <Card className="w-full">
              <div className="flex gap-3 items-start">
                <Avatar src={item.avatar} />
                <div>
                  <Text strong>{item.author}</Text>
                  <div className="text-gray-500 text-sm">{item.datetime}</div>
                  <p className="mt-1">{item.content}</p>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
