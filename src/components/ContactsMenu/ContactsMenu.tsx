import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { useContext, useState } from 'react';
import { FriendData, SelectedUser } from '../../types/types';
import { formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';
import { NotifContext } from '../../context/NotifContext';

type Props = {
  userFriends: FriendData[];
  close: () => void;
  selectChatUser: (user: SelectedUser) => void;
};

export default function ContactsMenu({
  userFriends,
  close,
  selectChatUser,
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const notifs = useContext(NotifContext);

  const newMsgs = notifs.filter(
    (notif) => notif.type === 'newChat' && !notif.seen
  );
  const displayUsers = getDisplayUsers();

  function getDisplayUsers() {
    if (!userFriends) return '';

    const filteredFriends = userFriends.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return filteredFriends.map((friend) => {
      const friendHasNewMsg = newMsgs.some((msg) => msg.userId === friend.id);

      return (
        <div
          key={friend.id}
          onClick={() => selectUser(friend)}
          className="flex cursor-pointer items-center gap-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          <div className="relative h-12 w-12 shrink-0 rounded-full">
            <img
              className="h-12 w-12 rounded-full"
              src={friend.photoURL}
              alt=""
              referrerPolicy="no-referrer"
            />
            {friendHasNewMsg && (
              <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-400 shadow"></div>
            )}
          </div>
          <div className="w-full">
            <p className="font-semibold">{friend.name}</p>
            <div className="flex justify-between text-sm text-zinc-700 dark:text-zinc-400">
              <p className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                {friend.lastMsg}
              </p>
              <p className="overflow-hidden whitespace-nowrap font-bold">
                {friend.lastMsgTime &&
                  formatDistanceToNowStrict(friend.lastMsgTime.toDate(), {
                    locale: es,
                  })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  function selectUser(user: FriendData) {
    selectChatUser({
      id: user.id,
      name: user.name,
      photoURL: user.photoURL,
    });
    close();
  }

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen justify-center bg-zinc-900/80 pt-32">
      <OutsideAlerter action={close}>
        <div className="flex w-80 flex-col rounded-lg shadow-lg">
          <div className="flex items-center justify-between rounded-t-lg bg-white px-4 pt-4 text-zinc-800 dark:bg-zinc-800 dark:text-white">
            <h1 className="text-2xl font-bold">AMIGOS</h1>
            <button onClick={close} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-b-lg bg-white p-4 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
            <label className="flex items-center gap-2 rounded-full bg-zinc-200 px-4 dark:bg-zinc-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                className="bg-zinc-200 p-2 dark:bg-zinc-600"
                type="text"
                placeholder="Buscar"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>

            <div className="flex flex-col gap-2 overflow-y-auto">
              {displayUsers}
            </div>
          </div>
        </div>
      </OutsideAlerter>
    </div>
  );
}
