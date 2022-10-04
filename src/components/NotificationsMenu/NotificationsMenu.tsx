import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import Avatar from '../../assets/avatar.png';

type Props = {
  close: () => void;
};

export default function NotificationsMenu({ close }: Props) {
  const user = useContext(AuthContext);

  return (
    <OutsideAlerter action={close}>
      <div className="absolute rounded-lg shadow-lg px-4 bg-white text-zinc-800 w-80 right-0 top-14">
        <div className="flex items-center gap-4 border-b py-4">
          <img
            className="w-16 rounded-full"
            src={user?.photoURL || Avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-sm">
              <span className="font-semibold">{user?.displayName} </span>
              ha compartido un recordatorio contigo.
            </p>
            <p className="text-xs font-bold mt-2">hace 22 horas</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-b py-4">
          <img
            className="w-16 rounded-full"
            src={user?.photoURL || Avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-sm">
              <span className="font-semibold">{user?.displayName} </span>
              ha compartido un recordatorio contigo.
            </p>
            <p className="text-xs font-bold mt-2">hace 22 horas</p>
          </div>
        </div>
      </div>
    </OutsideAlerter>
  );
}
