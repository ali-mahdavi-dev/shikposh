import "@ant-design/v5-patch-for-react-19";
import React from "react";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Content } from "antd/lib/layout/layout";
import { ConfigProvider } from "antd";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import localFont from "next/font/local";
import "./globals.css";

const theme = {
  token: {
    colorPrimary: "#ec4899", // Pink primary color
    colorSuccess: "#10b981", // Green
    colorWarning: "#f59e0b", // Yellow
    colorError: "#ef4444", // Red
    borderRadius: 12,
    fontFamily:
      'Vazirmatn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 16,
    },
    Input: {
      borderRadius: 12,
    },
    Select: {
      borderRadius: 12,
    },
  },
};

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
    <html lang="fa">
      <body>
        <React.StrictMode>
          <AntdRegistry>
            <ConfigProvider theme={theme} direction="rtl">
              {/* Header */}
              <Header />
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
              <Footer />
            </ConfigProvider>
          </AntdRegistry>
        </React.StrictMode>
      </body>
    </html>
  );
}
