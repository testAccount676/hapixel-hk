import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CatalogItem } from "@/types/catalog";
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { toast } from "sonner";

interface EditItemFormProps {
  page_id: number;
  item_ids: string;
  catalog_name: string;
  amount: number;
  cost_credits: number;
  cost_diamonds: number;
  cost_pixels: number;
}

export default function EditItemForm(item: CatalogItem) {
  const { put, data, processing, setData, errors } = useForm<Required<EditItemFormProps>>({
    amount: item.amount,
    catalog_name: item.catalog_name,
    cost_credits: item.cost_credits,
    cost_diamonds: item.cost_diamonds,
    cost_pixels: item.cost_pixels,
    item_ids: item.item_ids,
    page_id: item.page_id,
  });

  function handleUpdateCatalogItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(item.id);
    put(`/catalog/items/${item.id}`, {
      onSuccess: () => toast.success(`Item: ${data.catalog_name} editado com sucesso!`),
      onError: () => toast.error("Não foi possível finalizar esta ação"),
    });
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Editar Item: {item.catalog_name} (ID: {item.item_ids})
        </DialogTitle>
        <DialogDescription>Altere propriedades deste item no catálogo.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleUpdateCatalogItem} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">ID</Label>
          <Input disabled value={item.id} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Página (ID)</Label>
          <Input onChange={(e) => setData("page_id", Number(e.target.value))} value={data.page_id} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Item ID</Label>
          <Input value={data.item_ids} onChange={(e) => setData("item_ids", e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Nome Cátalogo</Label>
          <Input value={data.catalog_name} onChange={(e) => setData("catalog_name", e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Amount (Quantidade)</Label>
          <Input value={data.amount} onChange={(e) => setData("amount", Number(e.target.value))} className="col-span-3" />
          {errors.amount && <span className="text-sm text-red-500">{errors.amount}</span>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Moedas</Label>
          <Input onChange={(e) => setData("cost_credits", Number(e.target.value))} value={data.cost_credits} />
          {errors.cost_credits && <span className="text-sm text-red-500">{errors.cost_credits}</span>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Diamantes</Label>
          <Input onChange={(e) => setData("cost_diamonds", Number(e.target.value))} value={data.cost_diamonds} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Pixels</Label>
          <Input onChange={(e) => setData("cost_pixels", Number(e.target.value))} value={data.cost_pixels} />
        </div>

        <Button type="submit" disabled={processing} className="flex cursor-pointer items-center gap-2">
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
