import { Task } from '../../types/types';
import { es } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { sortTasksbyHour } from '../../utils/date';

type Props = {
  date: string;
  tasks: Task[];
};

export default function DailyTasksDisplay({ date, tasks }: Props) {
  const dailyTasksUnordered = tasks.filter((task) => task.date === date);
  const dailyTasks = sortTasksbyHour(dailyTasksUnordered);
  console.log(dailyTasksUnordered);
  console.log(dailyTasks);
  const tasksJSX = dailyTasks.map((task) => (
    <div key={task.id} className="flex flex-col py-2">
      <p className="text-sm font-bold text-zinc-700">{task.hour}</p>
      <p className="text-2xl font-semibold text-zinc-900">{task.title}</p>
      <p className="text-sm text-zinc-800">{task.description}</p>
      <div className="my-4 flex gap-2 self-end">
        {/* <img src={AvatarTwo} alt="" />
        <img src={AvatarThree} alt="" /> */}
      </div>
      <hr />
    </div>
  ));

  return (
    <div className="mb-4 w-[350px] rounded-lg bg-zinc-100 p-8 text-zinc-800 shadow-lg md:mt-4">
      <h3 className="mb-8 text-sm font-bold uppercase">
        {format(parseISO(date), 'PPPP', { locale: es })}
      </h3>
      {dailyTasks.length > 0 ? (
        tasksJSX
      ) : (
        <div>No hay actividades creadas en la fecha seleccionada.</div>
      )}
    </div>
  );
}
