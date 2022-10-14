import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';
import { NotifContext } from '../../context/NotifContext';
import { nanoid } from 'nanoid';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

type Props = {
  close: () => void;
};

export default function NotificationsMenu({ close }: Props) {
  const { notifs, seenNotifs } = useContext(NotifContext);
  const user = useContext(AuthContext);

  const unseenNotifs = notifs.filter((notif) => !seenNotifs.includes(notif.id));

  async function handleClick(id: string) {
    try {
      const docRef = doc(db, 'users', user.id);
      await updateDoc(docRef, {
        seenNotifs: arrayUnion(id),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const notificationsDisplay =
    unseenNotifs.map((notif) => (
      <div
        key={nanoid()}
        onClick={() => handleClick(notif.id)}
        className="flex cursor-pointer items-center gap-4 border-b py-4 hover:bg-zinc-100"
      >
        <img
          className="w-16 rounded-full"
          src={notif.photoURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div>
          <p className="text-sm">
            <span className="font-semibold">{notif.name} </span>
            te ha enviado una solicitud de amistad.
          </p>
          <p className="mt-2 text-xs font-bold">
            hace{' '}
            {formatDistanceToNowStrict(notif.time.toDate(), {
              locale: es,
            })}
          </p>
        </div>
      </div>
    )) || null;

  return (
    <OutsideAlerter action={close}>
      <div className="absolute right-0 top-12 w-80 rounded-lg bg-white px-4 text-zinc-800 shadow-lg">
        <h2 className="mt-4 text-xl font-bold">Notificaciones</h2>
        {unseenNotifs.length < 1 && (
          <p className="py-4">No tienes nuevas notificaciones.</p>
        )}
        {notificationsDisplay}
      </div>
    </OutsideAlerter>
  );
}
