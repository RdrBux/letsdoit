import { useContext } from 'react';
import { NotifContext } from '../../context/NotifContext';
import { FriendData, SelectedUser } from '../../types/types';
import botAvatar from '../../assets/botAvatar.jpg';

type Props = {
  openMenu: () => void;
  userFriends: FriendData[];
  selectChatUser: (user: SelectedUser) => void;
};

export default function ContactsNav({
  openMenu,
  userFriends,
  selectChatUser,
}: Props) {
  const notifs = useContext(NotifContext);
  const newMsgs = notifs.filter(
    (notif) => notif.type === 'newChat' && !notif.seen
  );
  const friendsAvatars = getAvatarButtons();

  function getAvatarButtons() {
    if (!userFriends) return;
    return userFriends.map((friend) => {
      const friendHasNewMsg = newMsgs.some((msg) => msg.userId === friend.id);
      return (
        <div key={friend.id} className="relative h-10 w-10 rounded-full">
          <img
            onClick={() => selectUser(friend)}
            className="h-10 w-10 cursor-pointer rounded-full"
            src={friend.photoURL}
            alt=""
            referrerPolicy="no-referrer"
          />
          {friendHasNewMsg && (
            <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-400 shadow"></div>
          )}
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
  }

  const botData = {
    id: 'xYBakCpC34YbT9kYCxh3OJX70q73',
    name: 'Bot Ayudante',
    photoURL:
      'https://media.istockphoto.com/id/819599030/vector/robot-face-icon-smiling-face-laugh-emotion-robotic-emoji.jpg?s=612x612&w=0&k=20&c=EEhge0MYWUWM50lhFXTAMx8r1ivUfQAElcuXyWr_p08=',
    lastMsg: 'hola',
    lastMsgTime: new Date(),
    status: 'accepted',
  };

  const bot = (
    <div className="relative h-10 w-10 rounded-full">
      <img
        onClick={() => selectChatUser(botData)}
        className="h-10 w-10 cursor-pointer rounded-full"
        src={botAvatar}
        alt=""
        referrerPolicy="no-referrer"
      />
    </div>
  );

  return (
    <div className="flex justify-center gap-4 border-t border-emerald-500/10 bg-emerald-900/90 py-2 px-4 shadow-lg">
      <div className="flex gap-4">
        {bot}
        {friendsAvatars}
      </div>

      <button
        onClick={openMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/25 p-2 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      </button>
    </div>
  );
}
