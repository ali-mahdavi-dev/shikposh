"use client";

import { Avatar, Card } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

interface ProfileCardProps {
  name?: string;
  avatar?: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name = "Ali Ahmagh",
  avatar = "/images/alilaloii.jpg",
  className = "",
}) => {
  return (
    <div className={`flex flex-col justify-center items-center !w-full ${className}`}>
      <Card className="w-10/12" hoverable>
        {/* Avatar */}
        <div className="flex items-center">
          <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-400 to-purple-700">
            <Avatar
              style={{ width: "132px", height: "132px" }}
              src={avatar}
              alt={name}
            />
          </div>
          <Title className="mr-3" level={3}>
            {name}
          </Title>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
