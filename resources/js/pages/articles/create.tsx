import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import { Loader2, PlusCircle } from "lucide-react";
import React, { useRef } from "react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Criar nova notícia",
    href: "/articles/create",
  },
];

const TINY_API_KEY = import.meta.env.VITE_TINY_API_KEY || "";

interface CreateArticleFormProps {
  title: string;
  short_story: string;
  long_story: string;
  category: string;
  image: File | null;

  [key: string]: string | File | null;
}

export default function CreateArticle() {
  const editorRef = useRef<any>(null);
  const { processing, data, post, setData, errors } = useForm<CreateArticleFormProps>({
    title: "",
    short_story: "",
    long_story: "",
    category: "",
    image: null,
  });

  function handleCreateArticle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const editorContent = editorRef.current?.getContent();
    setData("long_story", editorContent);
    console.log(data);
    post("/articles", {
      onSuccess: () => toast.success("Notícia criada com sucesso!", {}),
    });
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

    if (!file) return;
    if (!allowedMimeTypes.includes(file.type)) {
      alert("Tipo de arquivo não permitido");
      return;
    }

    setData("image", file);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Criar Notícia" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="rounded p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-xl">Criar Notícia</div>

            <Button>
              <Link href="/articles" prefetch>
                Voltar
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent>
              <form onSubmit={handleCreateArticle}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Olá! Seja bem vindo ou vinda :)"
                      value={data.title}
                      onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={data.category} onValueChange={(e) => setData("category", e)}>
                      <SelectTrigger id="category">
                        <SelectValue defaultValue="General" placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">Geral</SelectItem>
                        <SelectItem value="Updates">Atualização</SelectItem>
                        <SelectItem value="Promotion">Promoção</SelectItem>
                        <SelectItem value="Activity">Atividade</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.category} />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <Label htmlFor="status">Descrição</Label>
                    <Input
                      type="text"
                      id="title"
                      onChange={(e) => setData("short_story", e.target.value)}
                      placeholder="A ciência nivela o campo para todos"
                      value={data.short_story}
                    />
                    <InputError message={errors.short_story} />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Editor
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>Hmmm... O que irei escrever hoje?</p>"
                    apiKey={TINY_API_KEY}
                    toolbar="image"
                    plugins={"image"}
                    init={{
                      height: 400,
                    }}
                  />
                  <InputError message={errors.long_story} />
                </div>

                <div className="mt-4">
                  <Label htmlFor="image">Selecionar imagem</Label>
                  <Input type="file" id="image" onChange={handleImage} />
                  <InputError message={""} />
                  {data.image && <img src={URL.createObjectURL(data.image)} alt="Preview" className="mt-2 w-32 rounded-lg object-cover" />}
                </div>

                <div className="mt-4 text-end">
                  <Button
                    size={"lg"}
                    className="flex cursor-pointer items-center gap-1 bg-emerald-600 text-white transition-all duration-300 hover:bg-emerald-500"
                    type="submit"
                    disabled={false}
                  >
                    {processing && <Loader2 className="animate-spin" />}
                    <span>Criar notícia</span> <PlusCircle />
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
