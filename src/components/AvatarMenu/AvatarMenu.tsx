import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { signOut } from 'firebase/auth';
import { auth, requestPermision } from '../../firebase';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  close: () => void;
};

export default function AvatarMenu({ close }: Props) {
  const user = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const checkedDarkMode = theme === 'dark';

  function handleLogOut() {
    signOut(auth)
      .then(() => {})
      .catch((err) => console.log(err));
  }

  function handleNotifs() {
    requestPermision();
  }

  return (
    <OutsideAlerter action={close}>
      <div className="absolute right-0 top-12 w-80 rounded-lg bg-white px-4 text-zinc-800 shadow-lg dark:bg-zinc-800 dark:text-white">
        <div className="flex items-center gap-4 border-b py-4 dark:border-zinc-600">
          <img
            className="w-10 rounded-full"
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
          />
          <p className="font-semibold">{user.name}</p>
        </div>
        <div
          onClick={handleNotifs}
          className="flex cursor-pointer items-center gap-4 rounded-lg py-4 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
            />
          </svg>

          <p>Activar notificaciones</p>
        </div>
        <div className="flex items-center gap-4 rounded-lg py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
          Modo oscuro
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer"
            checked={checkedDarkMode}
            onChange={() =>
              setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'))
            }
          />
        </div>
        <div
          onClick={handleLogOut}
          className="flex cursor-pointer items-center gap-4 rounded-lg py-4 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>

          <p>Cerrar sesi??n</p>
        </div>
      </div>
    </OutsideAlerter>
  );
}
