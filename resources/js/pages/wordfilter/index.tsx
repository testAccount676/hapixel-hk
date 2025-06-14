import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddWordForm from "@/forms/word-filter/add-word-form";
import EditWordForm from "@/forms/word-filter/edit-word-form";
import AppLayout from "@/layouts/app-layout";
import { WordFilterPaginationProps } from "@/types/word-filter";
import { Head, router } from "@inertiajs/react";
import debounce from "lodash/debounce";
import { PlusIcon, Search, TrashIcon } from "lucide-react";
import React, { useRef } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { toast } from "sonner";

interface WordFilterManagementProps {
  words: WordFilterPaginationProps;
}

export default function WordFilterManagementPage({ words }: WordFilterManagementProps) {
  function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  const handleWordSearch = useRef(
    debounce((query: string) => {
      router.get("/word-filter", { search: query }, { preserveState: true, replace: true });
    }, 500),
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleWordSearch(value);
  };

  return (
    <>
      <AppLayout>
        <Head title={"Filtro de Palavras"} />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-md p-4">
          <div className="rounded-md p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="relative w-full sm:w-1/3">
                <Input id={"search"} onChange={onSearchChange} className="peer ps-9" placeholder="Busque qualquer palavra..." type="search" />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <Search size={16} aria-hidden="true" />
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    Adicionar Palavra
                    <PlusIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <AddWordForm />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Palavra</TableHead>
                      <TableHead>Replacement</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead>Atualizado em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {words.data.map(({ id, word, updated_at, replacement, created_at }) => (
                      <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{word}</TableCell>
                        <TableCell>{replacement}</TableCell>
                        <TableCell>{formatDate(created_at)}</TableCell>
                        <TableCell>{formatDate(updated_at)}</TableCell>

                        <TableCell className="space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="cursor-pointer bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600" size={"sm"}>
                                <HiOutlinePencilSquare />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <EditWordForm id={id} word={word} replacement={replacement} />
                            </DialogContent>
                          </Dialog>

                          <Button
                            onClick={() => {
                              router.delete(`/word-filter/${id}`, {
                                onSuccess: () => toast.success(`Palavra removida com sucesso.`),
                                onError: () => toast.error("Ocorreu algum erro."),
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

            <Pagination pagination={words} />
          </div>
        </div>
      </AppLayout>
    </>
  );
}
