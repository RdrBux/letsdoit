import plusButton from '../../assets/plusButton.svg';
import { Task } from '../../types/types';
import TasksSlider from '../TasksSlider/TasksSlider';

type Props = {
  tasks: Task[];
};

export default function HamburgerMenu({ tasks }: Props) {
  return (
    <div className="fixed z-10 flex h-screen w-screen flex-col gap-4 bg-zinc-200 p-4 text-zinc-900">
      <button className="flex w-fit items-center gap-2 rounded-lg bg-emerald-700 py-4 px-8 shadow-lg">
        <p className="text-base font-bold text-white">AGREGAR ACTIVIDAD</p>
        <img className="w-3" src={plusButton} alt="" />
      </button>
      <TasksSlider title="Hoy" tasks={tasks} />
    </div>
  );
}
