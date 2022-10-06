import { Task } from '../../types/types';
import { formatHour } from '../../utils/date';
import AvatarTwo from '../../assets/avatar2.png';
import AvatarThree from '../../assets/avatar3.png';

type Props = {
  tasks: Task[];
};

export default function DailyTasksDisplay({ tasks }: Props) {
  const tasksJSX: [] = []; /* tasks.map((task) => (
    <div key={task.id} className="flex flex-col p-4">
      <p className="text-sm font-bold text-zinc-700">{formatHour(task.time)}</p>
      <p className="mb-2 text-lg font-semibold text-zinc-900">{task.title}</p>
      <p className="text-sm text-zinc-800">{task.description}</p>
      <div className="my-4 flex gap-2 self-end">
        <img src={AvatarTwo} alt="" />
        <img src={AvatarThree} alt="" />
      </div>
      <hr />
    </div>
  )); */

  return (
    <div className="mb-4 w-[350px] rounded-lg bg-zinc-100 p-4 shadow-lg md:mt-4">
      {tasks.length > 0 ? (
        tasksJSX
      ) : (
        <div className="p-4 text-zinc-800">
          No hay actividades creadas en la fecha seleccionada.
        </div>
      )}
    </div>
  );
}
