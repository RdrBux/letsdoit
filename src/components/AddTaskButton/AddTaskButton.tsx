import plusButton from '../../assets/plusButton.svg';

export default function AddTaskButton() {
	return (
		<button className='bg-purple-500 p-4 rounded-lg fixed bottom-4 right-4'>
			<img src={plusButton} alt="" />
		</button>
	)
}
