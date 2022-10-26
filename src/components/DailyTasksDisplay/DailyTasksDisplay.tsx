import { Task, TaskParticipant } from '../../types/types';
import { es } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { sortTasksbyHour } from '../../utils/date';
import ParticipantAvatar from '../ParticipantAvatar/ParticipantAvatar';

type Props = {
  date: string;
  tasks: Task[];
  selectTask: React.Dispatch<React.SetStateAction<string>>;
  displayTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DailyTasksDisplay({
  date,
  tasks,
  selectTask,
  displayTask,
}: Props) {
  function handleClick(id: string) {
    selectTask(id);
    displayTask(true);
  }

  const dailyTasksUnordered = tasks.filter((task) => task.date === date);
  const dailyTasks = sortTasksbyHour(dailyTasksUnordered);
  const tasksJSX = dailyTasks.map((task) => {
    const participantsDisplay = [task.creator, ...task.participants].map(
      (person) => <ParticipantAvatar key={person.id} user={person} />
    );

    return (
      <div
        onClick={() => handleClick(task.id)}
        key={task.id}
        className="flex cursor-pointer flex-col py-1"
      >
        <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
          {task.hour}
        </p>
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {task.title}
        </p>
        <p className="text-sm text-zinc-800 dark:text-zinc-200">
          {task.description}
        </p>
        <div className="my-4 flex gap-2 self-end">{participantsDisplay}</div>
        <hr className="border-zinc-300 dark:border-zinc-600" />
      </div>
    );
  });

  return (
    <div className="mb-4 w-[350px] rounded-lg bg-zinc-200 p-8 text-zinc-800 shadow-lg dark:bg-zinc-700 dark:text-zinc-100 md:mt-4">
      <h3 className="mb-6 text-sm font-bold uppercase">
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
