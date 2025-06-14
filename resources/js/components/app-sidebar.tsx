import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FooterNavItem } from "@/types";
import { Link } from "@inertiajs/react";
import { LucideGitlab } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import AppLogo from "./app-logo";

// const mainNavItems: NavItem[] = [
//    {
//       groupName: "Dashboard",
//       title: "Dashboard",
//       href: "/dashboard",
//       icon: LayoutGrid,
//    },
// ];

const footerNavItems: FooterNavItem[] = [
  {
    title: "GitLab",
    href: "https://gitlab.com/yaeow/hapixel-dashboard",
    icon: LucideGitlab,
  },
  {
    title: "Discord",
    href: "#",
    icon: FaDiscord,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
