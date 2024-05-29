import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Tarefa {
  titulo: string;
  descricao?: string;
  realizada: boolean;
  data_criacao: string;
  realizar_tarefa: () => void;
  deletar_tarefa: () => void;
}

export function TarefaItem({
  titulo,
  descricao,
  realizada,
  data_criacao,
  realizar_tarefa,
  deletar_tarefa,
}: Tarefa) {
  const formatDateToBrazilian = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
  };

  return (
    // <div className="flex flex-col rounded-lg bg-white px-4 pt-4 pb-2 shadow-md dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
    <Card className="flex flex-col px-4 pt-4 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox id="task1" checked={realizada} onClick={realizar_tarefa} />
          <div>
            <h3
              className={`
            text-lg font-medium  dark:text-gray-400
            ${realizada ? "line-through text-gray-500" : ""}
          `}
            >
              {/* line-through text-gray-500 */}
              {titulo}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{descricao}</p>
          </div>
        </div>
        <Button className="bg-destructive" onClick={deletar_tarefa}>
          Deletar
        </Button>
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400 text-right mt-2">
        {formatDateToBrazilian(data_criacao)}
      </div>
    </Card>
  );
}
