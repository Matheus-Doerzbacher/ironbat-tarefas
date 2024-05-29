"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ROUTES } from "../../apiRoutes";

export default function Component() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpa a mensagem de erro antes de tentar o login

    try {
      console.log(ROUTES.URL_LOGIN);
      const response = await fetch(ROUTES.URL_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro desconhecido");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access); // Armazena o token no localStorage
      console.log("Login bem-sucedido");
      router.push("/tarefas"); // Redireciona para a página de tarefas
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Erro na operação de login:", error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Bem-vindo de volta! Faça login para continuar.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                placeholder="Insira seu nome de usuário"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                placeholder="Insira sua senha"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleSubmit}>
              Entrar
            </Button>
            <p className="text-destructive mt-3 text-center">{errorMessage}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
