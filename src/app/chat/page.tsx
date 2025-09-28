import { Avatar, Collapse, CollapseProps } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center flex-col">
      <div className="w-1/2 h-2/3 border-2 border-gray-200 rounded flex flex-col">
        {/* Header */}
        <div className="h-10 pl-2 flex items-center bg-gray-200">
          <span className="font-bold">Chat</span>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Avatar 1 */}
          <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
            <div className="ml-1 size-3 rounded-full bg-green-300"></div>
            <div className="flex items-center">
              <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
                <Avatar className="w-24 " src="/images/alilaloii.jpg" />
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
