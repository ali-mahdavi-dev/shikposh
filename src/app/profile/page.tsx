import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Card, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import ProfileCard from "./components/profile-card";
import ChatFixed from "./components/chat";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "همه",
    children: (
      <div className="p-5 flex flex-wrap justify-center">
        <Link href={"/products/aaaa"}>
          <Card
            className="max-w-72 min-w-64 !m-4"
            hoverable
            cover={
              <div className="overflow-hidden w-full ease-in">
                <Image
                  width={260}
                  height={200}
                  className="transition-transform duration-300 hover:scale-110"
                  alt="example"
                  src="/images/girl.png"
                />
              </div>
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Link>
        <Link href={"/products/bbb"}>
          <Card
            className="max-w-72 min-w-64 !m-4"
            hoverable
            cover={
              <div className="overflow-hidden w-full ease-in">
                <Image
                  width={260}
                  height={200}
                  className="transition-transform duration-300 hover:scale-110"
                  alt="example"
                  src="/images/girl.png"
                />
              </div>
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Link>
        <Link href={"/products/ccc"}>
          <Card
            className="max-w-72 min-w-64 !m-4"
            hoverable
            cover={
              <div className="overflow-hidden w-full ease-in">
                <Image
                  width={260}
                  height={200}
                  className="transition-transform duration-300 hover:scale-110"
                  alt="example"
                  src="/images/girl.png"
                />
              </div>
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Link>
        <Link href={"/products/ddd"}>
          <Card
            className="max-w-72 min-w-64 !m-4"
            hoverable
            cover={
              <div className="overflow-hidden w-full ease-in">
                <Image
                  width={260}
                  height={200}
                  className="transition-transform duration-300 hover:scale-110"
                  alt="example"
                  src="/images/girl.png"
                />
              </div>
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Link>
      </div>
    ),
  },
  {
    key: "2",
    label: "دسته بندی",
    children: "Content of Tab Pane 2",
  },
];
export default function page() {
  return (
    <div className="flex items-center flex-col  ">
      {/* Card */}
      <div className="w-full flex justify-center">
        <ProfileCard />
        <div className="w-1/12"></div>
        <div className="fixed right-0 bottom-0 mr-1 w-3/12 z-50">
          <ChatFixed />
        </div>
      </div>

      <div className="w-full flex justify-center mt-6">
        <Tabs
          className="w-8/12 bg-white p-3 min-h-64 rounded"
          centered
          defaultActiveKey="1"
          items={items}
        />
        <div className="w-2/12"></div>
      </div>

      {/* Comment */}
      <div className="w-full flex justify-center">
        <Card className="w-6/12 !mt-14">
          <div className="flex items-center">
            <Avatar className="!w-16 !h-16" src="/images/alilaloii.jpg" />
            <div className="ml-2 flex flex-col justify-start">
              <Title level={5}>Ali Ahmagh</Title>
              <div>
                <CalendarOutlined />
                <span>2024/02/22 08:08:08 Am</span>
              </div>
            </div>
          </div>
        </Card>
        <div className="w-1/12"></div>
      </div>
    </div>
  );
}
