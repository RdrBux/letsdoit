import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';
import { NotifContext } from '../../context/NotifContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Notif, SelectedUser } from '../../types/types';

type Props = {
  selectChatUser: (user: SelectedUser) => void;
  close: () => void;
};

export default function NotificationsMenu({ selectChatUser, close }: Props) {
  const notifs = useContext(NotifContext);
  const user = useContext(AuthContext);
  const [filterNotifs, setFilterNotifs] = useState(true);

  const unseenNotifs = getNotifs();

  function getNotifs() {
    if (!filterNotifs) return notifs;
    return notifs.filter((notif) => notif.seen === false);
  }

  async function handleCloseClick(id: string) {
    try {
      const docRef = doc(db, 'users', user.id, 'notifs', id);
      await updateDoc(docRef, {
        seen: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick(notif: Notif) {
    selectChatUser({
      id: notif.userId || 'unknown',
      name: notif.name,
      photoURL: notif.photoURL,
    });
    handleCloseClick(notif.id);
    close();
  }

  const notificationsDisplay =
    unseenNotifs.map((notif) => (
      <div
        key={notif.id}
        /* onClick={() => handleClick(notif.id)} */
        onClick={() => handleClick(notif)}
        className="flex cursor-pointer items-center gap-4 border-b p-4 hover:bg-zinc-100"
      >
        <img
          className="w-16 rounded-full"
          src={notif.photoURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            <span className="font-semibold">{notif.name} </span>
            te ha enviado una solicitud de amistad.
          </p>
          <p className="text-xs font-bold">
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
      <div className="absolute right-0 top-12 w-80 rounded-lg bg-white text-zinc-800 shadow-lg">
        <h2 className="mt-4 px-4 text-xl font-bold">Notificaciones</h2>
        {unseenNotifs.length < 1 && (
          <p className="p-4">No tienes nuevas notificaciones.</p>
        )}
        {notificationsDisplay}

        <button
          onClick={() => setFilterNotifs((prev) => !prev)}
          className="px-4 py-2 text-sm font-semibold underline"
        >
          {filterNotifs ? 'Ver todas' : 'Ver no leídas'}
        </button>
      </div>
    </OutsideAlerter>
  );
}
