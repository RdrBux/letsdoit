import hamburger from '../../assets/hamburger.svg';
import avatar from '../../assets/avatar.png';
import NotificationButton from '../NotificationButton/NotificationButton';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import NotificationsMenu from '../NotificationsMenu/NotificationsMenu';

type TopNavProps = {
  toggleMenu: any;
};

export default function TopNav({ toggleMenu }: TopNavProps) {
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const user = useContext(AuthContext);

  function handleAvatar() {
    if (!openAvatar) setOpenAvatar(true);
  }

  function handleNotifications() {
    if (!openNotifications) setOpenNotifications(true);
  }

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between bg-emerald-900 px-4 py-2 text-white">
      <div className="flex items-center gap-4">
        <button onClick={toggleMenu}>
          <img className="w-6" src={hamburger} alt="" />
        </button>
        <h1 className="cursor-default text-2xl font-bold tracking-wide">
          DO<span className="text-lime-200">IT</span>
        </h1>
      </div>
      <div className="relative flex items-center">
        <NotificationButton handleClick={handleNotifications} />
        <button
          className="ml-4 h-10 w-10 rounded-full bg-white/10"
          onClick={handleAvatar}
        >
          <img
            className="w-10 rounded-full"
            src={user?.photoURL || avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
        </button>
        {openNotifications && (
          <NotificationsMenu close={() => setOpenNotifications(false)} />
        )}
        {openAvatar && <AvatarMenu close={() => setOpenAvatar(false)} />}
      </div>
    </div>
  );
}
