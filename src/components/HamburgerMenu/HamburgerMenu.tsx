import {
  format,
  isFuture,
  isThisMonth,
  isThisWeek,
  isToday,
  parseISO,
} from 'date-fns';
import plusButton from '../../assets/plusButton.svg';
import { Task } from '../../types/types';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import TasksSlider from '../TasksSlider/TasksSlider';

type Props = {
  tasks: Task[];
  handleTaskButton: () => void;
  selectTask: React.Dispatch<React.SetStateAction<string>>;
  displayTask: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
};

export default function HamburgerMenu({
  tasks,
  handleTaskButton,
  selectTask,
  displayTask,
  close,
}: Props) {
  const monthTasksUnsorted = tasks.filter(
    (task) =>
      isThisMonth(parseISO(task.date)) &&
      isFuture(parseISO(task.date + 'T' + task.hour))
  );

  const monthTasks = [...monthTasksUnsorted].sort(
    (a, b) =>
      +parseISO(a.date + 'T' + a.hour) - +parseISO(b.date + 'T' + b.hour)
  );

  const weekTasks = monthTasks.filter((task) =>
    isThisWeek(parseISO(task.date), { weekStartsOn: 1 })
  );

  const todayTasks = weekTasks.filter(
    (task) =>
      isToday(parseISO(task.date)) &&
      task.date === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <div className="fixed z-20 h-screen w-full bg-black/80">
      <OutsideAlerter action={close}>
        <div className="fixed z-20 flex h-screen w-[90vw] flex-col gap-4 overflow-y-auto bg-zinc-200/[0.95] p-4 pb-20 text-zinc-900 dark:bg-zinc-900/[0.98] dark:text-zinc-100">
          <h2 className="text-2xl font-bold">PRÓXIMAS ACTIVIDADES</h2>
          <button
            onClick={handleTaskButton}
            className="flex w-fit items-center gap-2 rounded-lg bg-emerald-700 py-4 px-8 shadow-lg duration-300 hover:bg-emerald-800"
          >
            <p className="text-base font-bold text-white">AGREGAR</p>
            <img className="w-3" src={plusButton} alt="" />
          </button>
          <TasksSlider
            type="day"
            tasks={todayTasks}
            selectTask={selectTask}
            displayTask={displayTask}
          />
          <TasksSlider
            type="week"
            tasks={weekTasks}
            selectTask={selectTask}
            displayTask={displayTask}
          />
          <TasksSlider
            type="month"
            tasks={monthTasks}
            selectTask={selectTask}
            displayTask={displayTask}
          />
        </div>
      </OutsideAlerter>
    </div>
  );
}
