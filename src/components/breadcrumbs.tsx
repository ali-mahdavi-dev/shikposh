"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeOutlined } from "@ant-design/icons";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Split path and filter out empty segments
  const pathSegments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = [
    {
      title: (
        <Link href="/" className="flex items-center gap-1 text-primary">
          <HomeOutlined className="ml-1" />
          <span>Home</span>
        </Link>
      ),
    },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;

      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize

      return {
        title: isLast ? (
          <span className="text-gray-500">{label}</span>
        ) : (
          <Link href={href} className="text-primary hover:underline">
            {label}
          </Link>
        ),
      };
    }),
  ];

  return (
    <div className="m-4">
      {breadcrumbItems.length !== 1 ? (
        <Breadcrumb
          items={breadcrumbItems}
          className="text-sm"
          separator={<span className="text-gray-400">/</span>}
        />
      ) : (
        <span></span>
      )}
    </div>
  );
}
