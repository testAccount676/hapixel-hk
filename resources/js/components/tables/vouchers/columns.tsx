import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Voucher } from "@/types/voucher";
import { ColumnDef } from "@tanstack/react-table";
import { TbGiftFilled, TbGiftOff } from "react-icons/tb";
import { DataTableColumnHeader } from "../column-header";
import { DataTableRowActions } from "../row-actions";

export const columns: ColumnDef<Voucher>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
    cell: ({ row }) => {
      const translations: Record<string, string> = {
        COINS: "Moedas",
        VIP_POINTS: "Diamantes",
      };

      const type = row.getValue("type") as string;
      const formattedType = translations[type] ?? type;
      return <Badge variant={"outline"}>{formattedType}</Badge>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "data",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const translations: Record<string, string> = {
        UNCLAIMED: "Não resgatado",
        CLAIMED: "Resgatado",
      };

      const translatedStatus = translations[status] ?? status;

      return (
        <div className="flex items-center">
          {status === "CLAIMED" ? (
            <TbGiftFilled size={18} className="text-muted-foreground mr-2" />
          ) : (
            <TbGiftOff size={18} className="text-muted-foreground mr-2" />
          )}
          <span>{translatedStatus}</span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Código" />,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
