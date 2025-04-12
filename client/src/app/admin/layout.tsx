import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-full">
        <div className="flex justify-between items-center py-4 px-8">
          <SidebarTrigger />
        </div>
        <div className="mx-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
