import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Loader2, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Criar Página",
    href: "/catalog/create-page",
  },
];

interface CreatePageFormProps {
  caption: string;
  min_rank: string;
  visible: "1" | "0";
  enabled: "1" | "0";
  order_num: string;
}

export default function CreateCatalogPage() {
  const [visible, setVisible] = useState<"1" | "0">("1");
  const [enabled, setEnabled] = useState<"1" | "0">("1");

  const { props } = usePage<{ message?: string }>();

  console.log(props);

  const { data, processing, post, setData } = useForm<Required<CreatePageFormProps>>({
    enabled: "1",
    visible: "1",
    caption: "Nova página",
    min_rank: "1",
    order_num: "1",
  });

  function handleEnabledChange(checked: boolean) {
    const value = checked ? "1" : "0";
    setEnabled(value);

    setData("enabled", enabled);
  }
  function handleVisibleChange(checked: boolean) {
    const value = checked ? "1" : "0";
    setVisible(value);

    //setData('visible', visible)
  }

  function handleCreateCatalogPage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setData("enabled", enabled);
    setData("visible", visible);

    post("/catalog/create-page");

    toast.success("Página criada com sucesso!");
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={"Criar Página"}></Head>

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="rounded border p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-xl">Criar Nova Página</div>

            <Button>
              <Link href="/catalog/pages" prefetch>
                Voltar
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent>
              <form onSubmit={handleCreateCatalogPage}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      type="text"
                      id="caption"
                      placeholder="Título da nova página"
                      value={data.caption}
                      onChange={(e) => setData("caption", e.target.value)}
                    />
                    {/*<InputError message={errors.title} />*/}
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="title">Rank Mínimo</Label>

                    <Select value={data.min_rank} onValueChange={(e) => setData("min_rank", e)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o rank mínimo para visualização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Ranks</SelectLabel>
                          <SelectItem value="1">1 - Usuário</SelectItem>
                          <SelectItem value="2">2 - VIP</SelectItem>
                          <SelectItem value="3">3 - Embaixador</SelectItem>
                          <SelectItem value="4">4 - Moderador</SelectItem>
                          <SelectItem value="5">5 - Administrador</SelectItem>
                          <SelectItem value="6">6 - Gerente</SelectItem>
                          <SelectItem value="7">7 - CEO</SelectItem>
                          <SelectItem value="8">8 - Fundador</SelectItem>
                          <SelectItem value="9">9 - Desenvolvedor</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-stone-500">Esta lista não é dinâmica.</span>
                    {/*<InputError message={errors.title} />*/}
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="order_num">Order Num</Label>
                    <Input type="text" value={data.order_num} onChange={(e) => setData("order_num", e.target.value)} />
                  </div>
                  <div className="col-span-2 flex flex-col gap-y-2 md:col-span-1">
                    <div className="flex items-center space-x-2">
                      <Switch id="enabled" onCheckedChange={handleEnabledChange} checked={enabled === "1"} />
                      <Label htmlFor="enabled">Habilitado</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="visible" onCheckedChange={handleVisibleChange} checked={visible === "1"} />
                      <Label htmlFor="visible">Visível</Label>
                    </div>

                    {/*<Select value={data.category} onValueChange={(e) => setData("category", e)}>*/}
                    {/*  <SelectTrigger id="category">*/}
                    {/*    <SelectValue defaultValue="General" placeholder="Selecione uma categoria" />*/}
                    {/*  </SelectTrigger>*/}
                    {/*  <SelectContent>*/}
                    {/*    <SelectItem value="General">Geral</SelectItem>*/}
                    {/*    <SelectItem value="Updates">Atualização</SelectItem>*/}
                    {/*    <SelectItem value="Promotion">Promoção</SelectItem>*/}
                    {/*    <SelectItem value="Activity">Atividade</SelectItem>*/}
                    {/*  </SelectContent>*/}
                    {/*</Select>*/}
                    {/*<InputError message={errors.category} />*/}
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
                    <span>Criar página</span> <PlusCircle />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
