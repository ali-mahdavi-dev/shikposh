import React from "react";
import { Avatar, Badge, Button, Divider, Flex, Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import Link from "next/link";
import WAutoComplete from "../w-auto-complete";
import WNotificationIcon from "../icons/w-notificationIcon";
import { HomeOutlined, MessageOutlined, TeamOutlined } from "@ant-design/icons";
import Logout from "./logout";

function HeaderCom() {
  return (
    <div>
      <Layout>
        <Header
          className="shadow-sm flex justify-between"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            background: "white",
          }}
        >
          <div>
            <Link href="/">
              <HomeOutlined />
            </Link>
            <Divider type="vertical" />
            <WAutoComplete />
          </div>
          <div>
            <Flex gap="small" wrap content="center" align="center">
              <Link href="/profile">
                <Button size="middle" type="primary" icon={<TeamOutlined />} />
              </Link>

              <Badge count={1}>
                <Link href="/chat">
                  <Button
                    type="primary"
                    size="middle"
                    icon={<MessageOutlined style={{ fontSize: "16px" }} />}
                  />
                </Link>
              </Badge>

              <div className="ml-1">
                <Badge count={2}>
                  <Link href="/notification">
                    <Button
                      size="middle"
                      type="primary"
                      icon={<WNotificationIcon />}
                    />
                  </Link>
                </Badge>
              </div>

              <Divider type="vertical" />

              <Link
                href="/notification"
                className="flex justify-end items-center"
              >
                <Button
                  style={{
                    height: "36px",
                    maxWidth: "200px",
                  }}
                  color="cyan"
                  variant="solid"
                >
                  <Avatar className="!-ml-2" src="/images/alilaloii.jpg" />
                  <span className="whitespace-nowrap">Ben Dev</span>
                </Button>
              </Link>

              <Logout />
            </Flex>
          </div>
        </Header>
      </Layout>
    </div>
  );
}

export default HeaderCom;
