'use client';

import { CaretUpOutlined } from '@ant-design/icons';
import { Avatar, Collapse, CollapseProps, Spin, Alert } from 'antd';
import { ContentLoading } from '@/shared/components/loading';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useChatUsers } from '@/hooks/use-api';

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface ChatFixedProps {
  users?: ChatUser[];
}

const ChatFixed: React.FC<ChatFixedProps> = ({ users: propUsers }) => {
  const { data: apiUsers = [], isLoading, error } = useChatUsers();
  const users = propUsers || apiUsers;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Chat',
      children: (
        <div className="max-h-80 overflow-y-auto pr-2">
          {isLoading ? (
            <ContentLoading tip="در حال بارگذاری کاربران..." size="small" />
          ) : error ? (
            <Alert message="خطا در بارگذاری کاربران" type="error" />
          ) : (
            users.map((user: ChatUser) => (
              <div
                key={user.id}
                className="mb-2 flex min-h-16 cursor-pointer items-center rounded border border-gray-100 bg-white shadow transition-shadow hover:shadow-md"
              >
                <div
                  className={`ml-1 size-3 rounded-full ${
                    user.isOnline ? 'bg-green-300' : 'bg-gray-300'
                  }`}
                />
                <div className="flex items-center">
                  <div className="ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-[0.5px]">
                    <Avatar className="w-24" src={user.avatar} alt={user.name} />
                  </div>
                  <Title className="ml-1" level={5}>
                    {user.name}
                  </Title>
                </div>
              </div>
            ))
          )}
        </div>
      ),
    },
  ];

  return (
    <Collapse
      className="bg-gray-600"
      items={items}
      expandIcon={({ isActive }) => <CaretUpOutlined rotate={isActive ? 180 : 0} />}
      defaultActiveKey={['1']}
    />
  );
};

export default ChatFixed;
