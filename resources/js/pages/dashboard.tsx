import MostPlayedChart from "@/components/charts/login-chart";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { FaDoorOpen } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import NewsChart from "../components/charts/news-chart";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

interface DashboardProps {
  roomsCount: number;
  totalUsersRegistered: number;
  furnisCount: number;
}

export default function Dashboard({ roomsCount, totalUsersRegistered, furnisCount }: DashboardProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-sidebar-border/70 dark:border-sidebar-border relative h-36 overflow-hidden rounded-xl border"
          >
            {/*<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />*/}
            <div className="gap-y-2 p-7">
              <div>
                <p className="text-muted-foreground text-sm">Total de Quartos</p>
              </div>
              <div>
                <span className="text-2xl font-semibold">{roomsCount}</span>
                <div className="mt-2 text-[13px]">
                  <p className="flex items-center gap-x-2 text-emerald-600">
                    <FaDoorOpen size={16} /> total de quartos criados
                    <img className="h-8 w-8" src={"https://www.habboassets.com/assets/badges/DE70K.gif"} />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-sidebar-border/70 dark:border-sidebar-border relative h-36 overflow-hidden rounded-xl border"
          >
            {/*<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />*/}
            <div className="gap-y-2 p-7">
              <div>
                <p className="text-muted-foreground text-sm">Usuários Criados</p>
              </div>
              <div>
                <span className="text-2xl font-semibold">{totalUsersRegistered}</span>
                <div className="mt-2 text-[13px]">
                  <p className="flex items-center gap-x-2 text-yellow-400">
                    <Users size={16} /> usuários já registrados
                    <img className="h-8 w-8" src={"https://www.habboassets.com/assets/badges/DE70K.gif"} />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-sidebar-border/70 dark:border-sidebar-border relative h-36 overflow-hidden rounded-xl border"
          >
            {/*<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />*/}
            <div className="gap-y-2 p-7">
              <div>
                <p className="text-muted-foreground text-sm">Mobis Hospedados</p>
              </div>
              <div>
                <span className="text-2xl font-semibold">{furnisCount}</span>
                <div className="mt-2 text-[13px]">
                  <p className="flex items-center gap-x-2 text-red-400">
                    <MdChair size={16} /> total de mobis hospedados
                    <img className="h-8 w-8" src={"https://www.habboassets.com/assets/badges/DE70K.gif"} />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/*border-sidebar-border/70 dark:border-sidebar-border  border*/}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-full overflow-hidden rounded-xl border">
            <NewsChart />
          </div>

          <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
            <MostPlayedChart />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
