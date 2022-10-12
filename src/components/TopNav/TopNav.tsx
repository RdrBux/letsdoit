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
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
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
