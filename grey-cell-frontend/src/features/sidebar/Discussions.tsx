import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/features/sidebar/AppSidebar";

// TODO: Decide whether this shold stay as a separate file or be in the App.tsx itself.
// Either ways, naming needs improvement
const Discussions = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-screen flex flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Discussions;
