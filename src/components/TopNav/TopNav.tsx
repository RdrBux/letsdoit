import hamburger from '../../assets/hamburger.svg';
import avatar from '../../assets/avatar.png';
import NotificationButton from '../NotificationButton/NotificationButton';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

type TopNavProps = {
  toggleMenu: any;
};

export default function TopNav({ toggleMenu }: TopNavProps) {
  const user = useContext(AuthContext);

  function handleLogOut() {
    signOut(auth)
      .then(() => {})
      .catch((err) => console.log(err));
  }

  return (
    <div className="sticky top-0 z-10 bg-emerald-900 p-4 text-white flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleMenu}>
          <img className="w-6" src={hamburger} alt="" />
        </button>
        <h1 className="text-2xl font-bold tracking-wide cursor-default">
          DO<span className="text-lime-200">IT</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <NotificationButton />
        <button onClick={handleLogOut}>
          <img
            className="w-10 rounded-full"
            src={user?.photoURL || avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </div>
  );
}
