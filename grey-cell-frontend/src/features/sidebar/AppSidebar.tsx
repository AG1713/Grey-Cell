import { Moon, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/state/store";
import {
  getDiscussions,
  setCurrentDiscussion,
} from "@/state/discussion/discussionSlice";
import CreateDiscussionDialog from "./CreateDiscussionDialog";

const AppSidebar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const discussions = useSelector((state: RootState) => state.discussions.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDiscussions());
  }, [dispatch]);

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setDiscussion = (id: number) => {
    dispatch(setCurrentDiscussion(id));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Discussions</SidebarGroupLabel>
          <CreateDiscussionDialog />
          <SidebarGroupContent>
            <SidebarMenu key={"dark mode"}>
              <label className="flex px-2 gap-1">
                {darkMode && <Moon className="size-5" />}
                {!darkMode && <Sun className="size-5" />}
                Dark mode
                <Switch
                  className="ml-auto"
                  checked={darkMode}
                  onCheckedChange={toggleTheme}
                />
              </label>
            </SidebarMenu>
            <SidebarMenu>
              {discussions.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => setDiscussion(item.id)}
                  >
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
