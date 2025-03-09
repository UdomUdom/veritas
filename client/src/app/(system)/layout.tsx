// layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <SidebarTrigger className="flex md:hidden " />
        {children}
      </main>
    </SidebarProvider>
  );
}
