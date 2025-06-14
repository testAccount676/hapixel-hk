import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader2, PlusCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Page = {
  id: number;
  caption: string;
};
interface AddCatalogItemPageProps {
  pages: Page[];
}

interface AddItemFormProps {
  page_id: number;
  item_ids: number;
  catalog_name: string;
  cost_credits: number;
  cost_diamonds: number;
  cost_pixels: number;
}

export default function AddCatalogItemPage({ pages }: AddCatalogItemPageProps) {
  const { processing, data, post, setData } = useForm<Required<AddItemFormProps>>({
    page_id: 1,
    item_ids: 0,
    catalog_name: "",
    cost_credits: 100,
    cost_diamonds: 100,
    cost_pixels: 100,
  });

  function handleCreateCatalogItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(data);
    post("/catalog/items/create", {
      onSuccess: () => toast.success(`Item adicionado ao catálogo!`),
    });
  }

  return (
    <>
      <AppLayout>
        <Head title={"Adicionar Item"} />

        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <div className="rounded border p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-xl">Adicionar item ao catálogo</div>

              <Button>
                <Link href="/catalog/items" prefetch>
                  Voltar
                </Link>
              </Button>
            </div>

            <Card>
              <CardContent>
                <form onSubmit={handleCreateCatalogItem}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="col-span-2">
                      <Label htmlFor="title">Página</Label>
                      <Select onValueChange={(e) => setData("page_id", Number(e))}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a página para registrar este item" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Páginas disponíveis</SelectLabel>
                            {pages.map((page) => (
                              <SelectItem value={page.id.toString()} key={page.id}>
                                {page.id} - {page.caption}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="item_id">Item ID</Label>
                      <Input
                        value={data.item_ids}
                        onChange={(e) => setData("item_ids", Number(e.target.value))}
                        type="text"
                        id="item_id"
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="catalog_name">Nome no Catálogo</Label>
                      <Input
                        value={data.catalog_name}
                        onChange={(e) => setData("catalog_name", e.target.value)}
                        type="text"
                        id="catalog_name"
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="coins">Quantidade de Moedas</Label>
                      <Input
                        value={data.cost_credits}
                        onChange={(e) => setData("cost_credits", Number(e.target.value))}
                        type="text"
                        id="coins"
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="diamonds">Quantidade de Diamantes</Label>
                      <Input
                        value={data.cost_diamonds}
                        onChange={(e) => setData("cost_diamonds", Number(e.target.value))}
                        type="text"
                        id="diamonds"
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="pixels">Quantidade de Pixels</Label>
                      <Input
                        value={data.cost_pixels}
                        onChange={(e) => setData("cost_pixels", Number(e.target.value))}
                        type="text"
                        id="pixels"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-end">
                    <Button
                      size={"lg"}
                      className="flex cursor-pointer items-center gap-1 bg-emerald-600 text-white transition-all duration-300 hover:bg-emerald-500"
                      type="submit"
                      disabled={processing}
                    >
                      {processing && <Loader2 className="animate-spin" />}
                      <span>Adicionar item</span> <PlusCircle />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
