import hamburger from '../../assets/hamburger.svg';
import notificationIcon from '../../assets/notificationIcon.svg';
import avatar from '../../assets/avatar.png';

type TopNavProps = {
	toggleMenu: any,
}

export default function TopNav({ toggleMenu }: TopNavProps) {
	return (
		<div className='bg-black p-4 text-white flex items-center justify-between'>
			<div className='flex items-center gap-8'>
				<button onClick={toggleMenu}><img className='w-5' src={hamburger} alt="" /></button>
				<h1 className='text-3xl font-bold'>LET'S DO IT</h1>
			</div>
			<div className='flex items-center gap-4'>
				<img src={notificationIcon} alt="" />
				<img src={avatar} alt="" />
			</div>
		</div>
	)
}
