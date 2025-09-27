"use client";
import { CaretRightOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Avatar, Collapse, CollapseProps } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Chat",
    children: (
      <div className="max-h-80 overflow-y-auto pr-2">
        {/* Chat List */}
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
        <div className="mb-2 flex items-center min-h-16 bg-white border border-gray-100 shadow rounded">
          <div className="ml-1 size-3 rounded-full bg-green-300"></div>
          <div className="flex items-center">
            <div className="p-[0.5px] ml-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              <Avatar className="w-24 " src="/alilaloii.jpg" />
            </div>
            <Title className="ml-1" level={5}>
              Ali Ahmagh
            </Title>
          </div>
        </div>
      </div>
    ),
  },
];
export default function ChatFixed() {
  return (
    <Collapse
    className="bg-gray-600"
      items={items}
      expandIcon={({ isActive }) => (
        <CaretUpOutlined  rotate={isActive ? 180 : 0} />
      )}
      defaultActiveKey={["1"]}
    />
  );
}
