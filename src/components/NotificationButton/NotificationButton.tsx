import { useContext, useState } from 'react';
import notificationIcon from '../../assets/notificationIcon.svg';
import { AuthContext } from '../../context/AuthContext';
import { Notif } from '../../types/types';

type Props = {
  handleClick: () => void;
};

export default function NotificationButton({ handleClick }: Props) {
  const user = useContext(AuthContext);
  const notifications = user.notifications.length || 0;

  return (
    <button
      onClick={handleClick}
      className="relative ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
    >
      <img className="w-4" src={notificationIcon} alt="" />
      {notifications > 0 && (
        <div className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
          {notifications}
        </div>
      )}
    </button>
  );
}
