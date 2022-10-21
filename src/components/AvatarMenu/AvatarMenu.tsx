import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  close: () => void;
};

export default function AvatarMenu({ close }: Props) {
  const user = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme);

  function handleLogOut() {
    signOut(auth)
      .then(() => {})
      .catch((err) => console.log(err));
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
        <div className="flex cursor-pointer items-center gap-4 rounded-lg py-4 hover:bg-zinc-100 dark:hover:bg-zinc-700">
          Darkmode?:
          <input
            type="checkbox"
            onClick={() =>
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
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>

          <p>Cerrar sesión</p>
        </div>
      </div>
    </OutsideAlerter>
  );
}
