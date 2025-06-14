import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { toast } from "sonner";

interface EditUserFormProps {
  username: string;
  email: string;
  motto: string;
  rank: number;
}

export default function EditUserForm(user: User) {
  const { data, setData, processing, put } = useForm<Required<EditUserFormProps>>({
    motto: user.motto,
    username: user.username,
    rank: user.rank,
    email: user.email,
  });

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/users/user/${user.id}`, {
      onSuccess: () => toast.success("Usuário editado com sucesso!"),
    });
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Editar Usuário: {user.username} (ID: {user.id})
        </DialogTitle>
        <DialogDescription>Editar informações deste usuário</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleEditUser} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="id">ID</Label>
          <Input id="id" disabled value={user.id} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Nome de Usuário</Label>
          <Input id="username" value={data.username} onChange={(e) => setData("username", e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="motto">Missão</Label>
          <Input id="motto" value={data.motto} onChange={(e) => setData("motto", e.target.value)} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="rank">Rank</Label>
          <Input id="rank" type="number" max={9} value={data.rank} onChange={(e) => setData("rank", Number(e.target.value))} />
        </div>

        <Button type="submit" disabled={processing || user.online === "1"} className="flex items-center gap-2">
          {processing ? (
            <>
              Salvando <LoaderCircle className="animate-spin" />
            </>
          ) : (
            <>
              Salvar <BsDatabaseFillCheck size={16} />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
