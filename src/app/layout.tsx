import "@ant-design/v5-patch-for-react-19";
import React from "react";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Content } from "antd/lib/layout/layout";
import HeaderCom from "@/components/layout/app-header";
import FooterCom from "@/components/layout/app-footer";
import "./globals.css";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Demo app built with Next.js 15, Ant Design v5, and React Query v5.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <React.StrictMode>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#5da9f5",
                },
              }}
            >
              {/* Header */}
              <HeaderCom />
              {/* Content */}
              <Content>
                <div
                  className="min-h-lvh px-2 bg-gray-50"
                  style={{
                    marginTop: 46,
                    padding: 24,
                  }}
                >
                  <main className="">{children}</main>
                </div>
              </Content>
              <FooterCom />
            </ConfigProvider>
          </AntdRegistry>
        </React.StrictMode>
      </body>
    </html>
  );
}
