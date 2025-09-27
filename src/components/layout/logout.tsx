"use client";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";

export default function Logout() {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    console.log("Start loading:", index);

    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };
  return (
    <Button
      type="dashed"
      icon={<PoweroffOutlined />}
      loading={loadings[1]}
      onClick={() => enterLoading(1)}
    >
      Logout
    </Button>
  );
}
