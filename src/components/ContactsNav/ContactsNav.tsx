import React from 'react'
import AvatarTwo from '../../assets/avatar2.png';
import AvatarThree from '../../assets/avatar3.png';
import AvatarFour from '../../assets/avatar4.png';
import AvatarFive from '../../assets/avatar5.png';
import plusButton from '../../assets/plusButton.svg';

export default function ContactsNav() {
	return (
		<div className='flex bg-emerald-900/90 py-2 px-4 gap-4 justify-center'>
			<div className='flex gap-4 overflow-x-auto'>
				<img src={AvatarTwo} alt="" />
				<img src={AvatarThree} alt="" />
				<img src={AvatarFour} alt="" />
				<img src={AvatarFive} alt="" />
			</div>

			<button className='bg-zinc-700 p-3 rounded-full flex items-center justify-center'>
				<img src={plusButton} alt="" />
				</button>
		</div>
	)
}
