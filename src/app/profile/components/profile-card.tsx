// "use client";
import { Avatar, Card } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export default function ProfileCard() {
  return (
    <div className="flex flex-col justify-center items-center !w-full">
      <Card className="w-10/12" hoverable>
        {/* Avatar */}
        <div className="flex items-center">
          <div className="p-[2px] rounded-full bg-gradient-to-r from-blue-500 to-green-400">
            <Avatar
              style={{ width: "132px", height: "132px" }}
              src="/alilaloii.jpg"
            />
          </div>
          <Title className="ml-3" level={3}>
            Ali Ahmagh
          </Title>
        </div>
      </Card>
    </div>
  );
}
