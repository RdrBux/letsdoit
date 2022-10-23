import { useState } from 'react';
import { FriendData, User } from '../../types/types';

type Props = {
  user: FriendData | User;
  isAccepted?: boolean;
};

export default function ParticipantAvatar({ user, isAccepted }: Props) {
  const [showName, setShowName] = useState(false);

  function getStatus() {
    if (isAccepted === true) {
      return (
        <div className="absolute -bottom-1 -right-1 rounded-full bg-green-700 p-1 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      );
    }
    if (isAccepted === false) {
      return (
        <div className="absolute -bottom-1 -right-1 rounded-full bg-red-700 p-1 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="absolute -bottom-1 -right-1 rounded-full bg-zinc-500 p-1 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      );
    }
  }

  function handleClick() {
    setShowName(true);
    setTimeout(() => {
      setShowName(false);
    }, 1000);
  }

  return (
    <div
      onClick={handleClick}
      className="relative h-12 w-12 rounded-full bg-zinc-100"
    >
      <img
        className="w-12 rounded-full"
        src={user.photoURL}
        alt=""
        referrerPolicy="no-referrer"
      />
      {getStatus()}
      {showName && (
        <div className="absolute top-0 z-10 whitespace-nowrap rounded bg-black p-1 font-semibold text-white">
          {user.name}
        </div>
      )}
    </div>
  );
}
