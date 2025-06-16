import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";
import { ArticlePaginationProps } from "@/types/article";
import { Head, Link, router, usePage } from "@inertiajs/react";
import debounce from "lodash/debounce";
import { EyeIcon, PlusIcon, Search } from "lucide-react";
import React, { useRef } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { TbTrashX } from "react-icons/tb";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Gerenciamento de Notícias",
    href: "/articles",
  },
];

export default function ArticlesIndex(props: { articles: ArticlePaginationProps }) {
  const { flash } = usePage<{ flash: { message?: string } }>().props;
  // const { auth } = usePage<SharedData>().props;

  const handleArticleSearch = useRef(
    debounce((query: string) => {
      router.get("/articles", { search: query }, { preserveState: true, replace: true });
    }, 500),
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleArticleSearch(value);
  };

  // function getUsername(id: string) {}

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Notícias" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-md p-4">
        <div className="rounded-md p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="relative w-full sm:w-1/3">
              <Input
                disabled={props.articles.data.length === 0}
                id={"search"}
                className="peer ps-9"
                placeholder="Procurar notícia..."
                type="search"
                onChange={onSearchChange}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Search size={16} aria-hidden="true" />
              </div>
            </div>

            <Button className="flex items-center gap-1">
              <Link href="/articles/create" prefetch>
                Criar Notícia
              </Link>
              <PlusIcon />
            </Button>
          </div>

          <Card>
            <CardContent>
              {props.articles.data.length === 0 ? (
                <>
                  <div className="flex items-center justify-center gap-x-1">
                    <img
                      className="m-2 h-28 w-28"
                      src="https://www.habboassets.com/assets/images/dump/com/web_promo_small/teaser_backtoschool.png"
                      alt="No data"
                    />

                    <div>
                      <h1 className="text-lg font-semibold">Ainda não foi criada nenhuma notícia</h1>
                      <p className="text-sm text-zinc-500">Que tal tentar?</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Imagem</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {props.articles.data?.map((article, index) => (
                        <TableRow key={article.id}>
                          <TableCell>{article.id}</TableCell>
                          <TableCell className="h-[40px] w-[20px] overflow-hidden">
                            <img
                              src={article.image!!}
                              alt={article.title}
                              className="h-full w-full cursor-pointer rounded object-cover transition-transform hover:scale-105"
                            />
                          </TableCell>
                          <TableCell>{article.title}</TableCell>
                          <TableCell>{article.short_story}</TableCell>
                          <TableCell>{article.category}</TableCell>
                          <TableCell>{article.author}</TableCell>
                          <TableCell className="space-x-1">
                            <Button className="cursor-pointer bg-yellow-500 text-white transition-all duration-300 hover:bg-yellow-600" size={"sm"}>
                              <EyeIcon />
                            </Button>
                            <Button className="cursor-pointer bg-emerald-500 text-white transition-all duration-300 hover:bg-emerald-600" size={"sm"}>
                              <HiOutlinePencilSquare />
                            </Button>
                            <Button
                              onClick={() => {
                                router.delete(`/articles/${article.id}`, {
                                  onSuccess: () => toast.success("Notícia deletada com sucesso"),
                                });

                                // alert(flash.message ? flash.message : "Notícia deletada com sucesso!");
                              }}
                              className="cursor-pointer bg-red-400 hover:bg-red-500"
                              size={"sm"}
                              variant={"destructive"}
                            >
                              <TbTrashX />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </CardContent>
          </Card>
          <Pagination pagination={props.articles} />
        </div>
      </div>
    </AppLayout>
  );
}
