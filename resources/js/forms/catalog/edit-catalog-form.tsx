import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@inertiajs/react";
import { SendIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export function EditPageForm({ page }: { page: any }) {
  const { put, data, setData, processing } = useForm({
    caption: page.caption,
    min_rank: page.min_rank,
    enabled: page.enabled,
    visible: page.visible,
    page_layout: page.page_layout,
    parent_id: page.parent_id,
  });

  function handleUpdatePage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    put(`/catalog/page/${page.id}`, {
      onSuccess: () => {
        toast.success(`Página (ID: ${page.id}) atualizada com sucesso!`);
      },
      onError: () => {
        toast.error(`Erro ao atualizar página (ID: ${page.id})`);
      },
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Editar Página: {page.caption} ({page.id})
        </DialogTitle>
        <DialogDescription>Altere propriedades desta página do catálogo.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleUpdatePage} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">ID</Label>
          <Input disabled value={page.id} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Parent ID</Label>
          <Input value={data.parent_id} onChange={(e) => setData("parent_id", e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Título</Label>
          <Input value={data.caption} onChange={(e) => setData("caption", e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Layout</Label>
          <Input value={data.page_layout} onChange={(e) => setData("page_layout", e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Min. Rank</Label>
          <Input value={data.min_rank} onChange={(e) => setData("min_rank", e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Visível</Label>
          <Switch checked={data.visible === "1"} onCheckedChange={(v) => setData("visible", v ? "1" : "0")} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Habilitado</Label>
          <Switch checked={data.enabled === "1"} onCheckedChange={(v) => setData("enabled", v ? "1" : "0")} />
        </div>

        <Button type="submit" disabled={processing} className="flex items-center gap-2">
          Salvar <SendIcon size={16} />
        </Button>
      </form>
    </>
  );
}
