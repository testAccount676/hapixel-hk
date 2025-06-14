import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle, LogIn } from "lucide-react";
import { FormEventHandler } from "react";

import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

type LoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    username: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AuthLayout title="Entre na sua conta" description="Entre normalmente, com nome de usuário e senha.">
      <Head title="Login" />

      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input
              id="username"
              type="text"
              required
              autoFocus
              tabIndex={1}
              value={data.username}
              onChange={(e) => setData("username", e.target.value)}
              placeholder="John Doe"
            />
            <InputError message={errors.username} />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              {canResetPassword && (
                <TextLink href={route("password.request")} className="ml-auto text-sm" tabIndex={5}>
                  Esqueceu sua senha?
                </TextLink>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Sua senha"
            />
            <InputError message={errors.password} />
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData("remember", !data.remember)} tabIndex={3} />
            <Label htmlFor="remember">Lembrar-me</Label>
          </div>

          <Button type="submit" className="mt-4 w-full cursor-pointer transition-all duration-200" tabIndex={4} disabled={processing}>
            {processing && (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </>
            )}
            {processing ? "Verificando" : "Entrar no Painel"} <LogIn />
          </Button>
        </div>

        {/*<div className="text-muted-foreground text-center text-sm">*/}
        {/*   Don't have an account?{" "}*/}
        {/*   <TextLink href={route("register")} tabIndex={5}>*/}
        {/*      Sign up*/}
        {/*   </TextLink>*/}
        {/*</div>*/}
      </form>

      {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
      <div className="text-foreground mb-4 text-center text-sm font-medium"></div>
    </AuthLayout>
  );
}
