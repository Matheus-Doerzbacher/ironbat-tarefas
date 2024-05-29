"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { TarefaItem } from "@/components/tarefa_item";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";

export default function TerefasPage() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3NTI3MzE4LCJpYXQiOjE3MTY5MjI1MTgsImp0aSI6IjU3ODQ4NzA1YjkyOTQzZTFhMWY1NTIyNGI1YzU3NTA3IiwidXNlcl9pZCI6MX0.2di0AXtSSmBsAarJUKR6zKcGZtaPMzw39Dr8NDGnwHg";

  useEffect(() => {
    fetch("http://localhost:8000/tarefas/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("A resposta da rede não foi boa");
        }
        return response.json();
      })
      .then((data) => setTarefas(data["results"]))
      .catch((error) =>
        console.error("Houve um problema com a operação de busca:", error)
      );
  }, []);

  function alterarRealizada(tarefa: any) {
    fetch(`http://localhost:8000/tarefas/${tarefa.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ realizada: !tarefa.realizada }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("A resposta da rede não foi boa");
        }
        return response.json();
      })
      .then((data) => {
        const updateListaTarefa = tarefas.map((t) =>
          t.id == tarefa.id ? { ...data } : t
        );
        setTarefas(updateListaTarefa);
      })
      .catch((error) =>
        console.error("Houve um problema com a operação de busca:", error)
      );
  }

  function adicionarTarefa() {
    fetch(`http://localhost:8000/tarefas/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ titulo, descricao }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("A resposta da rede não foi boa");
        }
        return response.json();
      })
      .then((data) => {
        const updateListaTarefa = [data, ...tarefas];
        setTarefas(updateListaTarefa);
        setIsOpen(false);
        setTitulo("");
        setDescricao("");
      })
      .catch((error) =>
        console.error("Houve um problema para criar a tarefa:", error)
      );
  }

  function deletarTarefa(tarefa: any) {
    fetch(`http://localhost:8000/tarefas/${tarefa.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("A resposta da rede não foi boa");
        }
      })
      .then((_) => {
        const updateListaTarefa = tarefas.filter((t) => t.id !== tarefa.id);
        setTarefas(updateListaTarefa);
      })
      .catch((error) =>
        console.error("Houve um problema para deletar a tarefa:", error)
      );
  }

  const modal = (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Adicionar Nova Tarefa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task-title">Título da Tarefa*</Label>
            <Input
              id="task-title"
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-description">Descrição</Label>
            <Textarea
              className="min-h-[100px]"
              id="task-description"
              placeholder="Digite a descrição da tarefa"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={adicionarTarefa}>
            Salvar
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            To-Do List
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe suas tarefas e mantenha-se organizado.
          </p>
        </div>
        {modal}
      </div>
      <div className="mt-8 space-y-4">
        {tarefas.length === 0 ? (
          <h3 className="text-center">Você não possui nenhuma tarefa</h3>
        ) : (
          tarefas.map((t) => {
            return (
              <TarefaItem
                key={t.id}
                data_criacao={t.data_criacao}
                realizada={t.realizada}
                titulo={t.titulo}
                descricao={t.descricao}
                realizar_tarefa={() => alterarRealizada(t)}
                deletar_tarefa={() => deletarTarefa(t)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
