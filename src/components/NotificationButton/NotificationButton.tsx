import { useState } from 'react';
import notificationIcon from '../../assets/notificationIcon.svg';

export default function NotificationButton() {
  const [notificactions, setNotifications] = useState(1);

  return (
    <button className="relative w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
      <img className="w-4" src={notificationIcon} alt="" />
      {notificactions > 0 && (
        <div className="bg-red-500 font-bold text-xs h-4 w-4 rounded-full flex items-center justify-center absolute top-0 right-0">
          {notificactions}
        </div>
      )}
    </button>
  );
}
