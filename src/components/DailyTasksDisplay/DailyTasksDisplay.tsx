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
      <p className="text-sm text-gray-700 font-bold">{formatHour(task.time)}</p>
      <p className="text-gray-900 text-lg font-semibold mb-2">{task.title}</p>
      <p className="text-sm text-gray-800">{task.description}</p>
      <div className="self-end flex gap-2 my-4">
        <img src={AvatarTwo} alt="" />
        <img src={AvatarThree} alt="" />
      </div>
      <hr className="bg-gray-300" />
    </div>
  ));

  return (
    <div className="w-[350px] p-4 bg-gray-100 shadow-lg mb-4">
      {tasks.length > 0 ? (
        tasksJSX
      ) : (
        <div className="text-gray-800 p-4">
          No hay tareas creadas en la fecha seleccionada.
        </div>
      )}
    </div>
  );
}
