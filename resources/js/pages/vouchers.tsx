"use client";

import { columns } from "@/components/tables/vouchers/columns";
import { VoucherDataTable } from "@/components/tables/vouchers/data-table";
import AppLayout from "@/layouts/app-layout";
import { SharedData } from "@/types";
import { Voucher } from "@/types/voucher";
import { Head, useForm, usePage } from "@inertiajs/react";

interface VouchersPageProps {
  vouchers: Voucher[];
}

export default function VouchersPage({ vouchers }: VouchersPageProps) {
  const props = usePage<SharedData>().props;

  const { data, setData, post, processing, reset } = useForm({
    type: "COINS",
    data: "100",
    user: props.auth.user.username,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    post("/vouchers", {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <AppLayout>
      <Head title="Vouchers" />

      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Vouchers</h2>
            <p className="text-muted-foreground">Gerencie todos os Vouchers do hotel.</p>
          </div>
          <div className="flex items-center space-x-2">...</div>
        </div>
        <VoucherDataTable columns={columns} data={vouchers} />
      </div>
    </AppLayout>
  );
}
