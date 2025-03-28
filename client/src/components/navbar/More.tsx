"use client";
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/blog">Blog</Link>,
  },
  {
    key: "2",
    label: <Link href="/news">News</Link>,
  },
  {
    key: "3",
    label: <Link href="/contact">Contact</Link>,
  },
  {
    key: "4",
    label: <Link href="/help">Help Center</Link>,
    danger: true,
  },
];

export default function More() {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space className="font-semibold text-base">
          <span>More</span>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}
