"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { TarefaItem } from "@/components/tarefa_item";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3NTI3MzE4LCJpYXQiOjE3MTY5MjI1MTgsImp0aSI6IjU3ODQ4NzA1YjkyOTQzZTFhMWY1NTIyNGI1YzU3NTA3IiwidXNlcl9pZCI6MX0.2di0AXtSSmBsAarJUKR6zKcGZtaPMzw39Dr8NDGnwHg";

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
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          To-Do List
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe suas tarefas e mantenha-se organizado.
        </p>
      </div>
      <div className="mt-8 space-y-4">
        {tarefas.map((t) => {
          return (
            <TarefaItem
              key={t.id}
              data_criacao={t.data_criacao}
              realizada={t.realizada}
              titulo={t.titulo}
              descricao={t.descricao}
            />
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/50 hover:shadow-lg hover:shadow-indigo-600/50 transition-all duration-300"
          size="lg"
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
}
