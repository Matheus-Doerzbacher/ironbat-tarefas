import { Checkbox } from "@/components/ui/checkbox";
interface Tarefa {
  titulo: string;
  descricao?: string;
  realizada: boolean;
  data_criacao: string;
}

export function TarefaItem({
  titulo,
  descricao,
  realizada,
  data_criacao,
}: Tarefa) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <Checkbox id="task1" checked={realizada} />
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
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {data_criacao}
      </div>
    </div>
  );
}
