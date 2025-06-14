import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import EditUserForm from "@/forms/users/edit-user-form";
import AppLayout from "@/layouts/app-layout";
import { SharedData } from "@/types";
import { UsersPaginationProps } from "@/types/users";
import { Head, router, usePage } from "@inertiajs/react";
import debounce from "lodash/debounce";
import { HammerIcon, Search, TrashIcon } from "lucide-react";
import React, { useRef } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { toast } from "sonner";

interface UsersManagementProps {
  users: UsersPaginationProps;
}

export default function UsersManagementPage({ users }: UsersManagementProps) {
  const { auth } = usePage<SharedData>().props;

  const handleUserSearch = useRef(
    debounce((query: string) => {
      router.get("/users/manage-accounts", { search: query }, { preserveState: true, replace: true });
    }, 500),
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleUserSearch(value);
  };

  function maskIP(ip?: string | null): string {
    if (!ip) return "---";

    // IPv4
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
      const parts = ip.split(".");
      return `${parts[0]}.${parts[1]}.***.***`;
    }

    // IPv6
    if (/^[a-fA-F0-9:]+$/.test(ip)) {
      const parts = ip.split(":");
      if (parts.length > 2) {
        return `${parts[0]}:${parts[1]}:${parts[2]}:****:****`;
      }
      return `****:****`;
    }

    return "Invalid IP.";
  }

  return (
    <>
      <AppLayout>
        <Head title={"Gerenciamento de Usuários"} />

        <div className="flex h-full flex-1 flex-col gap-4 rounded-md p-4">
          <div className="rounded-md p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="relative w-full sm:w-1/3">
                <Input id={"search"} onChange={onSearchChange} className="peer ps-9" placeholder="Buscar usuário..." type="search" />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <Search size={16} aria-hidden="true" />
                </div>
              </div>
            </div>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nick</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Missão</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.data.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className={"flex items-center overflow-hidden"}>
                          <img
                            className="mt-[-10px]"
                            src={`https://www.habbo.com.br/habbo-imaging/avatarimage?&figure=${user.figure}&direction=2&head_direction=2&headonly=1`}
                            alt={user.username}
                          />
                          {user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.motto}</TableCell>
                        <TableCell>{maskIP(user.last_ip)}</TableCell>
                        <TableCell>{user.rank}</TableCell>
                        <TableCell className="text-sm">
                          {user.online === "1" ? (
                            <>
                              <p className={"text-emerald-600"}>Online</p>
                            </>
                          ) : (
                            <>
                              <p className="text-red-400">Offline</p>
                            </>
                          )}
                        </TableCell>

                        <TableCell className="space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="cursor-pointer bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600" size={"sm"}>
                                <HiOutlinePencilSquare />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <EditUserForm {...user} />
                            </DialogContent>
                          </Dialog>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  disabled={user.online != "1"}
                                  onClick={() => {
                                    router.post("/rcon/ban-user", {
                                      username: user.username,
                                      bannerId: auth.user.id,
                                      bannerUsername: auth.user.username,
                                    });
                                    toast.success(`${user.username} foi banido!`);
                                  }}
                                  className="cursor-pointer bg-yellow-500 text-white transition-all duration-300 hover:bg-yellow-400"
                                  size={"sm"}
                                >
                                  <HammerIcon />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Esta é uma ação remota, equivale a :ban %player%</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <Button
                            onClick={() => {
                              router.delete("/users/user/" + user.id, {
                                onSuccess: () => toast.success(`${user.username} foi deletado com sucesso!`),
                                onError: () => toast.error("Ocorreu algum erro."),
                              });
                            }}
                            className="cursor-pointer bg-red-400 text-white transition-all duration-300 hover:bg-red-500"
                            size={"sm"}
                          >
                            <TrashIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Pagination pagination={users} />
          </div>
        </div>
      </AppLayout>
    </>
  );
}
