export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-8">{children}</div>;
}
