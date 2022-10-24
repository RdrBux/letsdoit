import { useContext } from 'react';
import notificationIcon from '../../assets/notificationIcon.svg';
import { NotifContext } from '../../context/NotifContext';

type Props = {
  handleClick: () => void;
};

export default function NotificationButton({ handleClick }: Props) {
  const notifs = useContext(NotifContext);
  function getNotifs() {
    if (notifs) {
      return notifs.filter(
        (notif) => notif.seen === false && notif.type !== 'newChat'
      );
    } else {
      return [];
    }
  }

  const unseenNotifs = getNotifs();
  const unseenNotifsLen = unseenNotifs.length;

  return (
    <button
      onClick={handleClick}
      className="relative ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
    >
      <img className="w-4" src={notificationIcon} alt="" />
      {unseenNotifsLen > 0 && (
        <div className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
          {unseenNotifsLen}
        </div>
      )}
    </button>
  );
}
