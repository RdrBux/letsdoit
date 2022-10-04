import { Task } from '../../types/types';
import { formatHour } from '../../utils/date';
import AvatarTwo from '../../assets/avatar2.png';
import AvatarThree from '../../assets/avatar3.png';

type Props = {
  tasks: Task[];
};

export default function DailyTasksDisplay({ tasks }: Props) {
  const tasksJSX = tasks.map((task) => (
    <div key={task.id} className="flex flex-col p-4">
      <p className="text-sm text-zinc-700 font-bold">{formatHour(task.time)}</p>
      <p className="text-zinc-900 text-lg font-semibold mb-2">{task.title}</p>
      <p className="text-sm text-zinc-800">{task.description}</p>
      <div className="self-end flex gap-2 my-4">
        <img src={AvatarTwo} alt="" />
        <img src={AvatarThree} alt="" />
      </div>
      <hr />
    </div>
  ));

  return (
    <div className="w-[350px] md:mt-4 p-4 bg-zinc-100 shadow-lg mb-4 rounded-lg">
      {tasks.length > 0 ? (
        tasksJSX
      ) : (
        <div className="text-zinc-800 p-4">
          No hay eventos creados en la fecha seleccionada.
        </div>
      )}
    </div>
  );
}
