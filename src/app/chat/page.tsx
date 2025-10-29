import { Avatar } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-2/3 w-1/2 flex-col rounded border-2 border-gray-200">
        {/* Header */}
        <div className="flex h-10 items-center bg-gray-200 pl-2">
          <span className="font-bold">Chat</span>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Avatar 1 */}
          <div className="mb-2 flex min-h-16 items-center rounded border border-gray-100 bg-white shadow">
            <div className="ml-1 size-3 rounded-full bg-green-300"></div>
            <div className="flex items-center">
              <div className="ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-[0.5px]">
                <Avatar className="w-24" src="/images/alilaloii.jpg" />
              </div>
              <Title className="ml-1" level={5}>
                Ali Ahmagh
              </Title>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
