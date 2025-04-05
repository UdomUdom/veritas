import PathButton from "@/components/build/PathButton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md  flex items-start justify-start ">
        <PathButton path="/" className="mb-2" name="Home" />
      </div>
      {children}
    </div>
  );
}
