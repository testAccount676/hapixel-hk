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
  id: number;
  word: string;
  replacement: string;
};

export default function EditWordForm(word: Word) {
  const { processing, data, setData, put } = useForm<Required<Word>>({
    id: word.id,
    replacement: word.replacement,
    word: word.word,
  });

  const handleEditWord = (e: React.FormEvent) => {
    e.preventDefault();

    put(`/word-filter/${word.id}`, {
      onSuccess: () => toast.success(`Palavra: ${data.word} atualizada com sucesso.`),
      onError: () => toast.error("Ocorreu algum erro."),
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar Palavra: {word.word}</DialogTitle>
        <DialogDescription>Edite este palavra no filtro</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleEditWord} className="grid gap-4 py-4">
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
              Alterando <LoaderCircle className="animate-spin" />
            </>
          ) : (
            <>
              Alterar <BsDatabaseFillCheck size={16} />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
