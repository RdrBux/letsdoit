import avatar from '../../assets/avatar.png';
import NotificationButton from '../NotificationButton/NotificationButton';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import NotificationsMenu from '../NotificationsMenu/NotificationsMenu';
import SearchMenu from '../SearchMenu/SearchMenu';

type TopNavProps = {
  menuOpen: boolean;
  toggleMenu: any;
};

export default function TopNav({ menuOpen, toggleMenu }: TopNavProps) {
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const user = useContext(AuthContext);

  function handleSearch() {
    if (!openSearch) setOpenSearch(true);
  }

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
          <div id="nav-icon" className={`${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <h1 className="cursor-default text-2xl font-bold tracking-wide">
          DO<span className="text-lime-200">IT</span>
        </h1>
      </div>
      <div className="relative flex items-center">
        <button
          onClick={handleSearch}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </button>

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
        {openSearch && <SearchMenu close={() => setOpenSearch(false)} />}
        {openNotifications && (
          <NotificationsMenu close={() => setOpenNotifications(false)} />
        )}
        {openAvatar && <AvatarMenu close={() => setOpenAvatar(false)} />}
      </div>
    </div>
  );
}
