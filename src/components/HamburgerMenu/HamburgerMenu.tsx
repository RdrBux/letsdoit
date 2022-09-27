import plusButton from '../../assets/plusButton.svg';

export default function HamburgerMenu() {
	return (
		<div className='w-screen h-screen fixed bg-black text-zinc-100 z-10 p-4'>
			<button className='flex items-center gap-2 py-4 px-8 bg-purple-600 rounded-lg'>
				<p className='font-bold text-base'>AGREGAR TAREA</p>
				<img className='w-3' src={plusButton} alt="" />
			</button>
		</div>
	)
}
