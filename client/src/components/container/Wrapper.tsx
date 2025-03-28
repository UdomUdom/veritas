import { Space } from "antd";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Space direction="vertical" size={32} style={{ display: "flex" }}>
        {children}
      </Space>
    </section>
  );
}
