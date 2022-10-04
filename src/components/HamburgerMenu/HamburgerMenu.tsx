import plusButton from '../../assets/plusButton.svg';
import TasksSlider from '../TasksSlider/TasksSlider';

export default function HamburgerMenu() {
  return (
    <div className="w-screen h-screen fixed text-zinc-900 bg-zinc-400/90 z-10 p-4 flex flex-col gap-4">
      <button className="flex items-center w-fit gap-2 py-4 px-8 bg-emerald-700 rounded-lg shadow-lg">
        <p className="font-bold text-base text-white">AGREGAR RECORDATORIO</p>
        <img className="w-3" src={plusButton} alt="" />
      </button>
      <TasksSlider />
    </div>
  );
}
