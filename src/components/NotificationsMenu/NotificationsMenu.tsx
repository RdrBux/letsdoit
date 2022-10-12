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
      <div className="absolute right-0 top-12 w-80 rounded-lg bg-white px-4 text-zinc-800 shadow-lg">
        <h2 className="mt-4 text-xl font-bold">Notificaciones</h2>
        <div className="flex items-center gap-4 border-b py-4">
          <img
            className="w-16 rounded-full"
            src={user?.photoURL || Avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-sm">
              <span className="font-semibold">{user?.name} </span>
              ha compartido una actividad contigo.
            </p>
            <p className="mt-2 text-xs font-bold">hace 22 horas</p>
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
              <span className="font-semibold">{user?.name} </span>
              ha compartido un recordatorio contigo.
            </p>
            <p className="mt-2 text-xs font-bold">hace 22 horas</p>
          </div>
        </div>
      </div>
    </OutsideAlerter>
  );
}
