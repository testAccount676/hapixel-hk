import { Head } from "@inertiajs/react";

import AppearanceTabs from "@/components/appearance-tabs";
import HeadingSmall from "@/components/heading-small";
import { type BreadcrumbItem } from "@/types";

import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Aparência",
    href: "/settings/appearance",
  },
];

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Aparência" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Aparência" description="Atualize o tema/aparência da sua aplicação" />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
