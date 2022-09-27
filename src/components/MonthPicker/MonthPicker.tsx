import arrow from '../../assets/leftArrow.svg';
import downArrow from '../../assets/downArrow.svg';

export default function MonthPicker() {
	return (
		<div className='px-4 py-6 flex items-center gap-8'>
			<button className='flex items-center gap-2'>
				<p className='text-2xl font-bold'>Octubre 2022</p>
				<img src={downArrow} alt="" />
			</button>
			<button>
				<img src={arrow} alt="" />
			</button>
			<button>
				<img className='rotate-180' src={arrow} alt="" />
			</button>
		</div>
	)
}
