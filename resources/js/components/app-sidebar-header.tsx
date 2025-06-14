import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { type BreadcrumbItem as BreadcrumbItemType } from "@/types";
import { BellIcon } from "lucide-react";

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  return (
    <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex w-full items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className="flex w-full">
          <div>
            <Button className="relative h-full w-full cursor-pointer rounded-md bg-transparent text-black duration-200 hover:bg-transparent hover:text-zinc-600 dark:text-white">
              <span className="absolute top-1 left-5 h-2 w-2 rounded-full bg-red-400"></span>
              <BellIcon />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
