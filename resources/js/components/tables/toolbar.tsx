import { Table } from "@tanstack/react-table";
import { Loader2, PlusCircle, PlusCircleIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Dialog, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DataTableViewOptions } from "./view-options";
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options"

// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface CreateVoucherFormProps {
  type: "COINS" | "VIP_POINTS";
  data: number;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { processing, data, setData, post, reset } = useForm<Required<CreateVoucherFormProps>>({
    data: 100,
    type: "COINS",
  });

  function createNewVoucher(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/vouchers", {
      onSuccess: () => {
        toast.success("Voucher criado com sucesso!");
        reset();
      },
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Procurar voucher..."
          value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("code")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="ml-2 hidden h-8 lg:flex">
            Criar Voucher <PlusCircleIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar novo voucher</DialogTitle>
            <DialogDescription>Após a criação, ele será notificado para todos os jogadores.</DialogDescription>
          </DialogHeader>

          <form onSubmit={createNewVoucher} className="flex flex-col gap-y-2">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select onValueChange={(value) => setData("type", value as any)}>
                <SelectTrigger disabled={processing} id="type">
                  <SelectValue defaultValue={data.type} placeholder="Selecione o tipo de Voucher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem disabled={processing} value="COINS">
                    Moedas
                  </SelectItem>
                  <SelectItem disabled={processing} value="VIP_POINTS">
                    Diamantes
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="data">Data</Label>
              <Input id="data" disabled={processing} onChange={(e) => setData("data", Number(e.target.value))} value={data.data} />
            </div>

            <DialogFooter>
              <Button disabled={processing} type="submit" variant={"outline"} className="flex items-center gap-x-2">
                Criar novo {processing ? <Loader2 className="animate-spin" /> : <PlusCircle />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
