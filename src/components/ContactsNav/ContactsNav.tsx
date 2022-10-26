import { useContext } from 'react';
import msgIcon from '../../assets/msgIcon.svg';
import { NotifContext } from '../../context/NotifContext';
import { FriendData, SelectedUser } from '../../types/types';

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

  return (
    <div className="flex justify-center gap-4 border-t border-emerald-500/10 bg-emerald-900/90 py-2 px-4 shadow-lg">
      <div className="flex gap-4">{friendsAvatars}</div>

      <button
        onClick={openMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/25 p-3"
      >
        <img src={msgIcon} alt="" />
      </button>
    </div>
  );
}
