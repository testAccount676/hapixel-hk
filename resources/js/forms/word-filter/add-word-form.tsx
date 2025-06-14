import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { toast } from "sonner";

type Word = {
  word: string;
  replacement: string;
};

export default function AddWordForm() {
  const { processing, data, setData, post } = useForm<Required<Word>>({
    replacement: "******",
    word: "Habbo",
  });

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();

    post("/word-filter", {
      onSuccess: () => toast.success(`A palavra: ${data.word} foi adicionada ao filtro!`),
      onError: () => toast.error("Ocorreu algum erro."),
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Adicionar Palavra</DialogTitle>
        <DialogDescription>Adicione uma nova palavra ao filtro</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleAddWord} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="word">Palavra</Label>
          <Input
            id="word"
            disabled={processing}
            onChange={(e) => {
              setData("word", e.target.value);
            }}
            placeholder={"Habbo"}
            value={data.word}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="replacement">Replacement</Label>
          <Input
            id="replacement"
            onChange={(e) => setData("replacement", e.target.value)}
            disabled={processing}
            value={data.replacement}
            placeholder={"******"}
          />
        </div>

        <Button type="submit" disabled={processing} className="flex items-center gap-2">
          {processing ? (
            <>
              Adicionando <LoaderCircle className="animate-spin" />
            </>
          ) : (
            <>
              Adicionar <BsDatabaseFillCheck size={16} />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
