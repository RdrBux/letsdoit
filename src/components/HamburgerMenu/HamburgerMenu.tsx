import {
  compareAsc,
  compareDesc,
  format,
  isFuture,
  isThisMonth,
  isThisWeek,
  isToday,
  parseISO,
} from 'date-fns';
import plusButton from '../../assets/plusButton.svg';
import { Task } from '../../types/types';
import TasksSlider from '../TasksSlider/TasksSlider';

type Props = {
  tasks: Task[];
};

export default function HamburgerMenu({ tasks }: Props) {
  const monthTasksUnsorted = tasks.filter(
    (task) =>
      isThisMonth(parseISO(task.date)) &&
      isFuture(parseISO(task.date + 'T' + task.hour))
  );

  const monthTasks = [...monthTasksUnsorted].sort(
    (a, b) =>
      +parseISO(a.date + 'T' + a.hour) - +parseISO(b.date + 'T' + b.hour)
  );

  console.table(monthTasksUnsorted);
  console.table(monthTasks);

  const weekTasks = monthTasks.filter((task) =>
    isThisWeek(parseISO(task.date), { weekStartsOn: 1 })
  );

  const todayTasks = weekTasks.filter(
    (task) =>
      isToday(parseISO(task.date)) &&
      task.date === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <div className="fixed z-10 flex h-screen w-screen flex-col gap-4 bg-zinc-200 p-4 text-zinc-800">
      <h2 className="text-2xl font-bold">PRÓXIMAS ACTIVIDADES</h2>
      <button className="flex w-fit items-center gap-2 rounded-lg bg-emerald-700 py-4 px-8 shadow-lg">
        <p className="text-base font-bold text-white">AGREGAR</p>
        <img className="w-3" src={plusButton} alt="" />
      </button>
      <TasksSlider type="day" tasks={todayTasks} />
      <TasksSlider type="week" tasks={weekTasks} />
      <TasksSlider type="month" tasks={monthTasks} />
    </div>
  );
}
