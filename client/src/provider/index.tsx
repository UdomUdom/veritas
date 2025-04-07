import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </div>
  );
}
