import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../../assets/avatar.png';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

type Props = {
  close: () => void;
};

export default function AvatarMenu({ close }: Props) {
  const user = useContext(AuthContext);

  function handleLogOut() {
    signOut(auth)
      .then(() => {})
      .catch((err) => console.log(err));
  }

  return (
    <OutsideAlerter action={close}>
      <div className="absolute rounded-lg shadow-lg px-4 bg-white text-zinc-800 w-80 right-0 top-14">
        <div className="flex items-center gap-4 border-b py-4">
          <img
            className="w-10 rounded-full"
            src={user?.photoURL || Avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
          <p className="font-semibold">{user?.displayName}</p>
        </div>
        <div
          onClick={handleLogOut}
          className="flex items-center gap-4 py-4 rounded-lg hover:bg-zinc-100 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
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
