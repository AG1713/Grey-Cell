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
import CreateDiscussionDialog from "../discussions/CreateDiscussionDialog";
import type { Discussion } from "../chat/api/discussionService";
import { Link } from "react-router-dom";

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

  const setDiscussion = (discussion: Discussion) => {
    dispatch(setCurrentDiscussion(discussion));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"models"}>
                <SidebarMenuButton asChild onClick={() => {}}>
                  <span>Models</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
              {discussions.map((discussion) => (
                <SidebarMenuItem key={discussion.name}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => setDiscussion(discussion)}
                  >
                    <Link to={`/discussions/${discussion.id}`}>
                      <span>{discussion.name}</span>
                    </Link>
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
