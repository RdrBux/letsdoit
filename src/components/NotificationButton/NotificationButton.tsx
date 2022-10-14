import { useContext, useState } from 'react';
import notificationIcon from '../../assets/notificationIcon.svg';
import { AuthContext } from '../../context/AuthContext';
import { NotifContext } from '../../context/NotifContext';
import { Notif } from '../../types/types';

type Props = {
  handleClick: () => void;
};

export default function NotificationButton({ handleClick }: Props) {
  const { notifs, seenNotifs } = useContext(NotifContext);
  const unseenNotifs = notifs.filter((notif) => !seenNotifs.includes(notif.id));
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
