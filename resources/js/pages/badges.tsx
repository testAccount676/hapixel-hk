import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { debounce } from "lodash";
import { PlusIcon, Search } from "lucide-react";
import { useRef } from "react";

type BadgeEntry = {
  [key: `badge_name_${string}`]: string;
} & {
  [key: `badge_desc_${string}`]: string;
};

type BadgesPaginator = {
  current_page: number;
  data: BadgeEntry[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

type BadgeManagementProps = {
  badges: BadgesPaginator;
};

export default function BadgesManagementPage({ badges }: BadgeManagementProps) {
  const handleUserSearch = useRef(
    debounce((query: string) => {
      router.get("/badges", { search: query }, { preserveState: true, replace: true });
    }, 500),
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleUserSearch(value);
  };

  return (
    <AppLayout>
      <Head title="Gerenciamento de Emblemas" />
      <div className="flex h-full flex-col gap-4 rounded-md p-4">
        <div className="rounded-md p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="relative w-full sm:w-1/3">
              <Input onChange={onSearchChange} id={"search"} className="peer ps-9" placeholder="Procurar emblema..." type="search" />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Search size={16} aria-hidden="true" />
              </div>
            </div>
            <div className={"flex items-center gap-2"}>
              <Button className="flex items-center gap-1">
                <Link href="/catalog/items/add" prefetch>
                  Hospedar
                </Link>
                <PlusIcon />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Emblema</TableHead>

                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {badges.data.map((badge, index) => {
                    const nameKey = Object.keys(badge).find((k) => k.startsWith("badge_name_"));
                    const descKey = Object.keys(badge).find((k) => k.startsWith("badge_desc_"));

                    if (!nameKey || !descKey) return null;

                    const code = nameKey.replace("badge_name_", "");

                    return (
                      <TableRow key={code}>
                        <TableCell>{(badges.current_page - 1) * badges.per_page + index + 1}</TableCell>
                        <TableCell className="max-w-5 truncate">{(badge as any)[nameKey]}</TableCell>
                        <TableCell className="max-w-5 truncate">{(badge as any)[descKey]}</TableCell>
                        <TableCell>{code}</TableCell>
                        <TableCell>
                          <img
                            src={`https://www.habboassets.com/assets/badges/${code}.gif`}
                            alt={(badge as any)[nameKey]}
                            className="h-[32px] w-[32px]"
                          />
                        </TableCell>
                        <TableCell>---</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Pagination pagination={badges} />
        </div>
      </div>
    </AppLayout>
  );
}
