import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { ChevronRight, LayoutGrid, NotebookText, ShoppingCart, User2Icon } from "lucide-react";
import { GiStarMedal } from "react-icons/gi";
import { GrArticle } from "react-icons/gr";
import { ImEyeBlocked } from "react-icons/im";
import { IoTicket } from "react-icons/io5";

export function NavMain() {
  const page = usePage();

  return (
    <>
      <SidebarGroup className="px-2 py-0">
        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem key={"Dashboard"}>
            <SidebarMenuButton asChild isActive={"/dashboard" === page.url} tooltip={{ children: "Dashboard" }}>
              <Link href={"/dashboard"} prefetch>
                <LayoutGrid />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroupLabel className="mt-1">Hotel</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem key={"Contas"}>
            <SidebarMenuButton asChild isActive={"/users/manage-accounts" === page.url} tooltip={{ children: "Contas" }}>
              <Link href={"/users/manage-accounts"} prefetch>
                <User2Icon />
                <span>Gerenciar Contas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key={"Filtro de Palavras"}>
            <SidebarMenuButton asChild isActive={"/word-filter" === page.url} tooltip={{ children: "Filtro de Palavras" }}>
              <Link href={"/word-filter"} prefetch>
                <ImEyeBlocked />
                <span>Filtro de Palavras</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key={"Vouchers"}>
            <SidebarMenuButton asChild isActive={"/vouchers" === page.url} tooltip={{ children: "Vouchs" }}>
              <Link href={"/vouchers"} prefetch>
                <IoTicket />
                <span>Vouchers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key={"Emblemas"}>
            <SidebarMenuButton asChild isActive={"/badges" === page.url} tooltip={{ children: "Emblemas" }}>
              <Link href={"/badges"} prefetch>
                <GiStarMedal />
                <span>Emblemas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem key={"Word Filter"}>
            <SidebarMenuButton asChild isActive={"/word-filter" === page.url} tooltip={{ children: "Filtro de Palavras" }}>
              <Link href={"/word-filter"} prefetch>
                <ImEyeBlocked />
                <span>Filtro de Palavras</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroupLabel className="mt-1">Website</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem key={"Articles"}>
            <SidebarMenuButton asChild isActive={"/articles" === page.url} tooltip={{ children: "Articles" }}>
              <Link href={"/articles"} prefetch>
                <GrArticle />
                <span>Gerenciar Notícias</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroupLabel className="mt-1">Catálogo</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem key={"Pages"}>
            <SidebarMenuButton asChild isActive={"/catalog/pages" === page.url} tooltip={{ children: "Pág. Catálogo" }}>
              <Link href={"/catalog/pages"} prefetch>
                <NotebookText />
                <span>Pág. Catálogo</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible>
            <SidebarMenuItem className="w-full p-0">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="data-[state=open]:bg-muted/50 group w-full" tooltip={"Catálogo"}>
                  <ShoppingCart />
                  <span>Catálogo</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Link href={"/catalog/items"}>
                        <span>Itens</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
