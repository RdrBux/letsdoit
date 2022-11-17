import avatar from '../../assets/avatar.png';
import NotificationButton from '../NotificationButton/NotificationButton';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import NotificationsMenu from '../NotificationsMenu/NotificationsMenu';
import SearchMenu from '../SearchMenu/SearchMenu';
import { SelectedUser } from '../../types/types';

type TopNavProps = {
  menuOpen: boolean;
  toggleMenu: any;
  selectChatUser: (user: SelectedUser) => void;
  backToHome: () => void;
};

export default function TopNav({
  menuOpen,
  toggleMenu,
  selectChatUser,
  backToHome,
}: TopNavProps) {
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
        <h1
          onClick={backToHome}
          className="cursor-pointer text-2xl font-bold tracking-wide"
        >
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
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
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
            src={user.photoURL || avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
        </button>
        {openSearch && (
          <SearchMenu
            selectChatUser={selectChatUser}
            close={() => setOpenSearch(false)}
          />
        )}
        {openNotifications && (
          <NotificationsMenu
            selectChatUser={selectChatUser}
            close={() => setOpenNotifications(false)}
          />
        )}
        {openAvatar && <AvatarMenu close={() => setOpenAvatar(false)} />}
      </div>
    </div>
  );
}
