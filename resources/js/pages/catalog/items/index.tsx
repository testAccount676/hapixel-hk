import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import EditItemForm from "@/forms/catalog/edit-item-form";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, SharedData } from "@/types";
import { CatalogItemsPaginationProps } from "@/types/catalog";
import { Head, Link, router, usePage } from "@inertiajs/react";
import debounce from "lodash/debounce";
import { PlusIcon, Search, TrashIcon } from "lucide-react";
import React, { useRef } from "react";
import { GrUpdate } from "react-icons/gr";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Itens",
    href: "/catalog/items",
  },
];

interface CatalogItemsProps {
  catalogItems: CatalogItemsPaginationProps;
}

export default function CatalogItemsPage({ catalogItems }: CatalogItemsProps) {
  const { auth } = usePage<SharedData>().props;

  const handleArticleItemSearch = useRef(
    debounce((query: string) => {
      router.get("/catalog/items", { search: query }, { preserveState: true, replace: true });
    }, 1000),
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleArticleItemSearch(value);
  };

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

  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Itens Catálogo" />

        <div className="flex h-full flex-1 flex-col gap-4 rounded-md p-4">
          <div className="rounded-md p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="relative w-full sm:w-1/3">
                <Input onChange={onSearchChange} id={"search"} className="peer ps-9" placeholder="Procurar página..." type="search" />
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
                  <Link href="/catalog/items/add" prefetch>
                    Adicionar item
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
                      <TableHead>Página (ID)</TableHead>
                      <TableHead>Item ID</TableHead>
                      <TableHead>Nome Catálogo</TableHead>
                      <TableHead>Ícone</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Moedas</TableHead>
                      <TableHead>Diamantes</TableHead>
                      <TableHead>Pixels</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {catalogItems.data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.page_id}</TableCell>
                        <TableCell>{item.item_ids}</TableCell>
                        <TableCell>{item.catalog_name}</TableCell>
                        <TableCell>
                          <img
                            onError={({ target }) => {
                              const image = target as HTMLImageElement;
                              image.src = "https://www.habboassets.com/assets/badges/US602.gif";
                            }}
                            src={`https://swf.hapixel.net/dcr/hof_furni/icons/${item.furniture_item_name}_icon.png`}
                            className="h-auto w-5"
                            alt={item.furniture_item_name}
                          />
                        </TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>
                          {/*{page.visible === "1" ?  <Badge className="bg-emerald-500/90 text-emerald-100">Sim</Badge> : <Badge variant="secondary"}>Não</Badge>}*/}
                          {item.cost_credits}
                        </TableCell>
                        <TableCell>{item.cost_diamonds}</TableCell>
                        <TableCell>{item.cost_pixels}</TableCell>
                        <TableCell className="space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="cursor-pointer bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600" size={"sm"}>
                                <HiOutlinePencilSquare />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <EditItemForm {...item} />
                            </DialogContent>
                          </Dialog>

                          <Button
                            onClick={() => {
                              router.delete("/catalog/items/" + item.id, {
                                onSuccess: () => {
                                  toast.success(`Item: ${item.catalog_name} removido do catálogo!`);
                                },
                                onError: () => {
                                  toast.error("Não foi possível executar esta ação.");
                                },
                              });
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

            <Pagination pagination={catalogItems} />
          </div>
        </div>
      </AppLayout>
    </>
  );
}
