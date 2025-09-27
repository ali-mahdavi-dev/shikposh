"use client";
import React, { useState } from "react";
import { AutoComplete as AntAutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

export default function WAutoComplete() {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <AntAutoComplete
      value={value}
      options={options}
      style={{ width: 200 }}
      onSelect={onSelect}
      onChange={onChange}
      onSearch={(text) => setOptions(getPanelValue(text))}
      placeholder="Type something..."
    />
  );
}
