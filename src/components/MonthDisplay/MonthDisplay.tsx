import React from 'react'
import DayDisplay from './DayDisplay/DayDisplay'

export default function MonthDisplay() {
	return (
		<div className='flex overflow-x-auto'>
			<div className='text-sm font-bold text-zinc-500 w-12 shrink-0 flex flex-col items-center'>
				<div className="mt-[110px]">0 am</div>
				<div className='mt-5'>1 am</div>
				<div className='mt-5'>2 am</div>
				<div className='mt-5'>3 am</div>
				<div className='mt-5'>4 am</div>
				<div className='mt-5'>5 am</div>
				<div className='mt-5'>6 am</div>
				<div className='mt-5'>7 am</div>
				<div className='mt-5'>8 am</div>
				<div className='mt-5'>9 am</div>
				<div className='mt-5'>10 am</div>
				<div className='mt-5'>11 am</div>
				<div className='mt-5'>12 am</div>
				<div className='mt-5'>1 pm</div>
				<div className='mt-5'>2 pm</div>
				<div className='mt-5'>3 pm</div>
				<div className='mt-5'>4 pm</div>
				<div className='mt-5'>5 pm</div>
				<div className='mt-5'>6 pm</div>
				<div className='mt-5'>7 pm</div>
				<div className='mt-5'>8 pm</div>
				<div className='mt-5'>9 pm</div>
				<div className='mt-5'>10 pm</div>
				<div className='mt-5'>11 pm</div>
			</div>
			<DayDisplay />
			<DayDisplay />
			<DayDisplay />
			<DayDisplay />
			<DayDisplay />
			<DayDisplay />
			<DayDisplay />
			<DayDisplay />

		</div>
	)
}
