import Pagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EditPageForm } from "@/forms/catalog/edit-catalog-form";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, SharedData } from "@/types";
import { CatalogPagesPaginationProps } from "@/types/catalog";
import { Head, Link, router, usePage } from "@inertiajs/react";
import debounce from "lodash/debounce";
import { PlusIcon, Search, TrashIcon } from "lucide-react";
import React, { useRef } from "react";
import { GrUpdate } from "react-icons/gr";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Pág. Catálogo",
    href: "/catalog/pages",
  },
];

interface CatalogPagesProps {
  catalogPages: CatalogPagesPaginationProps;
}

export interface UpdateCatalogFormProps {
  caption: string;
  min_rank: string;
  enabled: "1" | "0";
  visible: "1" | "0";
  page_layout: string;
  parent_id: string;
}

export default function CatalogPages(props: CatalogPagesProps) {
  const { auth } = usePage<SharedData>().props;

  function handleUpdateCatalog() {
    router.post(
      "/rcon/reload-catalog",
      { user_id: auth.user.id },
      {
        onSuccess: () => {
          toast.success("Catálogo atualizado! Verifique o hotel.");
        },
        onError: () => {
          toast.error("Não foi possível executar essa ação.");
        },
      },
    );
  }

  const handleArticleSearch = useRef(
    debounce((query: string) => {
      router.get("/catalog/pages", { search: query }, { preserveState: true, replace: true });
    }, 500),
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleArticleSearch(value);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pág. Catálogo" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-md p-4">
        <div className="rounded-md p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="relative w-full sm:w-1/3">
              <Input onChange={onSearchChange} disabled={false} id={"search"} className="peer ps-9" placeholder="Procurar página..." type="search" />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Search size={16} aria-hidden="true" />
              </div>
            </div>
            <div className={"flex items-center gap-2"}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={handleUpdateCatalog} className="flex cursor-pointer gap-x-2" variant="outline">
                      Atualizar loja - RCON <GrUpdate size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Esta é uma ação remota, equivale a :update catalog</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button className="flex items-center gap-1">
                <Link href="/catalog/create-page" prefetch>
                  Criar Página
                </Link>
                <PlusIcon />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Parent ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Layout</TableHead>
                    <TableHead>Ícone</TableHead>
                    <TableHead>Min Rank</TableHead>
                    <TableHead>Vísivel</TableHead>
                    <TableHead>Habilitado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {props.catalogPages.data.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell>{page.id}</TableCell>
                      <TableCell>{page.parent_id}</TableCell>
                      <TableCell>{page.caption}</TableCell>
                      <TableCell>{page.page_layout}</TableCell>
                      <TableCell>
                        <img src={`https://swf.hapixel.net/c_images/catalogue/icon_${page.icon_image}.png`} className="h-auto w-4" alt={""} />
                      </TableCell>
                      <TableCell>{page.min_rank}</TableCell>
                      <TableCell>
                        {/*{page.visible === "1" ?  <Badge className="bg-emerald-500/90 text-emerald-100">Sim</Badge> : <Badge variant="secondary"}>Não</Badge>}*/}
                        <Badge variant={"secondary"} className={` ${page.visible === "1" && "bg-emerald-500/90 text-emerald-100"} `}>
                          Sim
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={"secondary"} className={` ${page.enabled === "1" && "bg-emerald-500/90 text-emerald-100"} `}>
                          Sim
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="cursor-pointer bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600" size={"sm"}>
                              <HiOutlinePencilSquare />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <EditPageForm page={page} />
                          </DialogContent>
                        </Dialog>

                        <Button
                          onClick={() => {
                            toast.success(`Página (ID: ${page.id}) excluída!`);
                            router.delete("/catalog/page/" + page.id);
                          }}
                          className="cursor-pointer bg-red-400 text-white transition-all duration-300 hover:bg-red-500"
                          size={"sm"}
                        >
                          <TrashIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Pagination pagination={props.catalogPages} />
        </div>
      </div>
    </AppLayout>
  );
}
