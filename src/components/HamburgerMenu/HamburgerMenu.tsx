import plusButton from '../../assets/plusButton.svg';
import TasksSlider from '../TasksSlider/TasksSlider';

export default function HamburgerMenu() {
	return (
		<div className='w-screen h-screen fixed bg-zinc-900 text-zinc-100 z-10 p-4 flex flex-col gap-4'>
			<button className='flex items-center w-fit gap-2 py-4 px-8 bg-emerald-700 rounded-lg'>
				<p className='font-bold text-base'>AGREGAR TAREA</p>
				<img className='w-3' src={plusButton} alt="" />
			</button>
			<TasksSlider />
			<TasksSlider />
		</div>
	)
}
