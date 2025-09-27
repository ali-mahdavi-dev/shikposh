"use client";
import { SmileOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";

export default function AccessPost() {
  const handleChange = (value: string | string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
        ]}
      />
    </div>
  );
}
