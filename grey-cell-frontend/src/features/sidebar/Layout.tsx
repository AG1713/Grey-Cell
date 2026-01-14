import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/features/sidebar/AppSidebar";
import { Outlet } from "react-router-dom";

// TODO: Decide whether this shold stay as a separate file or be in the App.tsx itself.
// Either ways, naming needs improvement
const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-screen flex flex-1">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
